import { Request, Response } from "express";
import ShortUrlModel, { ShortUrl } from "../models/shortUrl";
import { customAlphabet } from "nanoid";

export async function createShortUrl(req: Request, res: Response) {
  // Get the destination from the request body
  const { destination, preferredAlias } = req.body;

  try {
    // Check if the preferred alias is already taken
    if (preferredAlias) {
      const existingUrl = await ShortUrlModel.findOne({ preferredAlias });
      if (existingUrl) {
        return res
          .status(400)
          .json({ message: "Preferred alias is already taken." });
      }
    }

    // Generate shortId using nanoid
    const nanoid = customAlphabet("abcdefghijklmnopqrstuv0987654321", 6);
    const shortId = nanoid();

    // Store the URL mapping
    const urlDocument: ShortUrl = new ShortUrlModel({
      destination,
      preferredAlias,
      shortId,
    });
    await urlDocument.save();

    const shortUrl = `http://localhost:4000/${urlDocument.shortId}`;
    res.json({
      shortUrl,
      alias: urlDocument.preferredAlias,
      id: urlDocument.shortId,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error." });
  }
}

export async function handleRedirect(req: Request, res: Response) {
  const { identifier } = req.params;

  try {
    // Find the URL document by either shortId or preferredAlias
    const urlDocument = await ShortUrlModel.findOne({
      $or: [{ shortId: identifier }, { preferredAlias: identifier }],
    });

    if (!urlDocument) {
      return res.status(404).json({ error: "Shortened URL not found." });
    }

    res.redirect(urlDocument.destination);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error." });
  }
}
