var child = require("child_process");

export type Options = {
  short?: boolean;
  dig?: string;
};

export const command = (args = [], options?: Options): Promise<string> => {
  if (options?.short === true && !args.includes("+short")) args.push("+short");
  const digCMD = options?.dig || "dig";
  return new Promise((resolve, reject) => {
    const process = child.spawn(digCMD, args);
    let shellOutput = "";

    process.stdout.on("data", (chunk) => {
      shellOutput += chunk;
    });

    process.stdout.on("error", (error) => {
      reject(error);
    });

    process.stdout.on("end", () => {
      try {
        if (shellOutput.indexOf("connection timed out; no servers could be reached") != -1) {
          reject(new Error("Servers are not reachable"));
        }
        resolve(shellOutput.replace(/\n$/, ""));
      } catch (err) {
        reject(err);
      }
    });
  });
};
