/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import "./src/env.js";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

/** @type {import("next").NextConfig} */
const config = {
  images: {
    remotePatterns: [
      { hostname: "utfs.io" }, 
      { hostname: "2ryc0965uu.ufs.sh" }, 
      { hostname: "0m7zywkdga.ufs.sh" }, 
      { hostname: "cdn.tuzemengroup.com" }
    ],
  },
};

export default withNextIntl(config);