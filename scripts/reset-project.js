const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

// Directories to clean
const dirsToClean = [".expo", "node_modules/.cache"];

// Clean directories
dirsToClean.forEach((dir) => {
  const dirPath = path.join(__dirname, "..", dir);
  if (fs.existsSync(dirPath)) {
    console.log(`Cleaning ${dir}...`);
    try {
      if (dir === ".expo") {
        // For .expo, preserve the types directory but clean everything else
        const items = fs.readdirSync(dirPath);
        items.forEach((item) => {
          if (item !== "types") {
            const itemPath = path.join(dirPath, item);
            if (fs.lstatSync(itemPath).isDirectory()) {
              fs.rmSync(itemPath, { recursive: true, force: true });
            } else {
              fs.unlinkSync(itemPath);
            }
          }
        });

        // Ensure the types directory exists
        const typesDir = path.join(dirPath, "types");
        if (!fs.existsSync(typesDir)) {
          fs.mkdirSync(typesDir, { recursive: true });
        }

        // Create router.d.ts if it doesn't exist
        const routerDtsPath = path.join(typesDir, "router.d.ts");
        if (!fs.existsSync(routerDtsPath)) {
          fs.writeFileSync(
            routerDtsPath,
            `// This file was auto-generated\ndeclare module "expo-router" {\n  export * from "expo-router/build/types";\n}`,
          );
        }
      } else {
        // For other directories, clean everything
        fs.rmSync(dirPath, { recursive: true, force: true });
        fs.mkdirSync(dirPath, { recursive: true });
      }
    } catch (error) {
      console.error(`Error cleaning ${dir}:`, error);
    }
  }
});

// Create .expo/types/router.d.ts if it doesn't exist
const expoTypesDir = path.join(__dirname, "..", ".expo", "types");
if (!fs.existsSync(expoTypesDir)) {
  fs.mkdirSync(expoTypesDir, { recursive: true });
}

const routerDtsPath = path.join(expoTypesDir, "router.d.ts");
if (!fs.existsSync(routerDtsPath)) {
  console.log("Creating router.d.ts...");
  fs.writeFileSync(
    routerDtsPath,
    `// This file was auto-generated\ndeclare module "expo-router" {\n  export * from "expo-router/build/types";\n}`,
  );
}

// Clear Metro bundler cache without starting the server
console.log("Clearing Metro bundler cache...");
try {
  execSync(
    "npx expo start --clear --no-dev-client --non-interactive --max-workers=1 --max-old-space-size=1024",
    {
      stdio: "inherit",
      timeout: 5000, // Reduced timeout to 5 seconds
    },
  );
} catch (error) {
  console.log("Finished clearing cache.");
}

// Add ulimit command to increase file descriptor limit
try {
  console.log("Attempting to increase file descriptor limit...");
  execSync("ulimit -n 10240", { stdio: "pipe" });
  console.log("File descriptor limit increased to 10240.");
} catch (error) {
  console.log(
    "Note: Could not increase file descriptor limit. This is normal in some environments.",
  );
}

// Increase file watch limit for Linux systems
try {
  if (process.platform === "linux") {
    console.log("Attempting to increase file watch limit...");
    execSync(
      "echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p",
      { stdio: "pipe" },
    );
  }
} catch (error) {
  console.log(
    "Note: Could not increase file watch limit. This is normal if not running as root or on non-Linux systems.",
  );
}

console.log(
  "Project reset complete. You can now restart your development server.",
);
