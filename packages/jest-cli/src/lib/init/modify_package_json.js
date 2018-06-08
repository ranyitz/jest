const updatePackageJson = (
  projectPackageJson: Object,
  shouldModifyScripts: Bool,
  hasJestProperty: Bool,
) => {
  // TODO: actually modify the package.json
  return JSON.stringify(projectPackageJson, null, 2) + '\n';
};

export default updatePackageJson;
