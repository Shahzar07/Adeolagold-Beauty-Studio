import next from "eslint-config-next";

/** Flat config — eslint-config-next ships a flat array in Next 16. */
const eslintConfig = [
  ...next,
  { ignores: [".next/**", "node_modules/**", "out/**", "next-env.d.ts"] },
];

export default eslintConfig;
