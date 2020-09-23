import fs from "fs";
import path from "path";

const gqlToTs = () => {
  const typeDefs = fs.readFileSync(
    path.join(__dirname, "./schema.graphql"),
    "utf8"
  );
  const outputPath = "src/models/types.ts";

  let stripped: string = removeAwsDirectives(typeDefs);

  fs.writeFile(outputPath, stripped, function (err) {
    if (err) throw err;
  });
};

const removeAwsDirectives = (typeDefs: string): string => {
  return typeDefs.replace("@model", "");
};

const addExports = (typeDefs: string): string => {
  return typeDefs.replace("@model", "");
};

gqlToTs();

export default gqlToTs;
