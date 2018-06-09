/**
 * Copyright (c) 2014-present, Facebook, Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

const updatePackageJson = (
  projectPackageJson: Object,
  shouldModifyScripts: boolean,
  hasJestProperty: boolean,
) => {
  // TODO: actually modify the package.json
  return JSON.stringify(projectPackageJson, null, 2) + '\n';
};

export default updatePackageJson;
