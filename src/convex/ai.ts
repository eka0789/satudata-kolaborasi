"use node";

import { v } from "convex/values";

import { action } from "./_generated/server";
import { vly } from "../lib/vly-integrations";

/** AI chat completion backed by the VLY AI integration. */
export const generateCompletion = action({
  args: {
    messages: v.array(
      v.object({
        role: v.union(
          v.literal("system"),
          v.literal("user"),
          v.literal("assistant"),
        ),
        content: v.string(),
      }),
    ),
    temperature: v.optional(v.number()),
    maxTokens: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const response = await vly.ai.completion({
      model: "gpt-4o-mini",
      messages: args.messages,
      temperature: args.temperature ?? 0.7,
      maxTokens: args.maxTokens ?? 300,
    });
    return response.data ?? null;
  },
});

/** Generate embeddings for a piece of text (used for semantic search). */
export const generateEmbeddings = action({
  args: { text: v.string() },
  handler: async (ctx, args) => {
    const response = await vly.ai.embeddings(args.text);
    return response.data ?? null;
  },
});
