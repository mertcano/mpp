const localExampleSecretKey = "local-development-only-example-key";

export function resolveMppxSecretKey({
  isDevelopment,
  secretKey,
  lifecycleEvent,
}: {
  isDevelopment: boolean;
  secretKey?: string;
  lifecycleEvent?: string;
}) {
  const isBuildPhase = lifecycleEvent === "build";

  if (!secretKey && !isDevelopment && !isBuildPhase) {
    throw new Error("MPP_SECRET_KEY is required outside development/test");
  }
  
  return secretKey ?? localExampleSecretKey;
}

export const mppxSecretKey = resolveMppxSecretKey({
  isDevelopment: import.meta.env.DEV,
  secretKey: process.env.MPP_SECRET_KEY,
  lifecycleEvent: process.env.npm_lifecycle_event,
});
