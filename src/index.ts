import { command } from "./command";
import { Options } from "./types";

export const resolveIp4 = async (domain: string, options?: Options): Promise<string[]> => {
  let host = options?.host ? [`@${options?.host}`] : [];

  const output = await command(["A", domain, ...host], { short: true });
  if (output?.length > 0) return output.split("\n");
  throw new Error(`queryA ENOTFOUND ${domain}`);
};

export const resolveCname = async (domain: string, options?: Options): Promise<string[]> => {
  let host = options?.host ? [`@${options?.host}`] : [];

  const output = await command(["CNAME", domain, ...host], { short: true });
  if (output?.length > 0) return output.split("\n");
  throw new Error(`queryCname ENOTFOUND ${domain}`);
};

export const resolveA = resolveIp4;

export const resolveMx = async (domain: string, options?: Options) => {
  let host = options?.host ? [`@${options?.host}`] : [];

  const output = await command(["MX", domain, ...host], { short: true });
  if (output?.length > 0) {
    var rec = output.split("\n");
    return rec.map((r) => {
      return { exchange: r.split(" ")[1], priority: parseInt(r.split(" ")[0]) };
    });
  }
  throw new Error(`queryMx ENOTFOUND ${domain}`);
};

export const resolveNs = async (domain: string, options?: Options): Promise<string[]> => {
  let host = options?.host ? [`@${options?.host}`] : [];

  const output = await command(["NS", domain, ...host], { short: true });
  if (output?.length > 0) return output.split("\n");
  throw new Error(`queryNs ENOTFOUND ${domain}`);
};

export const resolveTxt = async (domain: string, options?: Options): Promise<string[]> => {
  let host = options?.host ? [`@${options?.host}`] : [];

  let output: string | string[] = await command(["TXT", domain, ...host], { short: true });
  if (output?.length > 0) {
    output = output.split("\n");
    output = output.map((r) => {
      if (!r.startsWith('"')) return undefined;
      if (r.startsWith('"')) r = r.substring(1);
      if (r.endsWith('"')) r = r.substring(0, r.length - 1);
      r = r.split('" "').join("");
      return r;
    });
    return output.filter((output) => output != undefined);
  }
  throw new Error(`queryTxt ENOTFOUND ${domain}`);
};
