export type DataType = {
  name: string;
  type: string;
  entryType: string;
  value: any;
  metadata: string;
};
export type IdentType = IRegEx | ISimple | string;
export type ObjType = {
  identity: IdentType;
  entry_type: string;
  metadata: string;
};
export type NameObj = { label: string };
export type NodeObj = { [key: string]: NameObj };
export type EdgeType = [string, string, {}];

export interface IRegEx {
  RegEx: { pattern: string; exclude: boolean; name: string };
}
export interface ISimple {
  Simple: string;
}

/**
 * @param obj - Given an object conforming to the minimal requirements - having an
 * identity, entry_type, and metadata, return an object with a consistent shape
 *
 * @returns object
 */
export const getData = (obj: {
  identity: IdentType;
  entry_type: string;
  metadata: Object;
}): DataType => {
  if (typeof obj.identity !== "undefined" && obj.identity === "Root") {
    return {
      name: "Root",
      type: "Root",
      entryType: "Root",
      value: null,
      metadata: JSON.stringify({})
    };
  }
  if ((obj.identity as IRegEx).RegEx) {
    const include = (obj.identity as IRegEx).RegEx.pattern;
    const hasExclude = "exclude" in (obj.identity as IRegEx).RegEx;
    const exclude = hasExclude ? (obj.identity as IRegEx).RegEx.exclude : null;
    const re = (obj.identity as IRegEx).RegEx;
    return {
      name: re.name,
      type: "RegEx",
      entryType: obj.entry_type,
      value: { pattern: include, hasExclude: hasExclude, exclude: exclude },
      metadata: JSON.stringify(obj.metadata)
    };
  }
  if ((obj.identity as ISimple).Simple) {
    let objIdent = (obj.identity as ISimple).Simple;
    return {
      name: objIdent,
      type: "Simple",
      entryType: obj.entry_type,
      value: null,
      metadata: JSON.stringify(obj.metadata)
    };
  }
  throw new Error("unable to getData");
};

/**
 * @function
 *
 * @param obj an object of type ObjType.
 * @returns The name of the object
 */
export const getName = (obj: ObjType): string => {
  if (typeof obj.identity !== "undefined" && obj.identity === "Root") {
    return "Root";
  }
  if (typeof obj.identity === "undefined") {
    throw new Error(`unable to get identity for obj: ${obj}`);
  }
  if ((obj.identity as IRegEx).RegEx) {
    return (obj.identity as IRegEx).RegEx.name;
  }
  if ((obj.identity as ISimple).Simple) {
    return (obj.identity as ISimple).Simple;
  }
  return "Failed To get Name";
};

/**
 * @function
 *
 * @param obj given an object of type ObjType, return a NameObj
 * @return NameObj, which is {name: string}
 */
export const getNameObj = (obj: ObjType): NameObj => {
  return { label: getName(obj) };
};

/**
 * @function
 *
 * @param nodes an array of `ObjType`s representing the nodes
 * @returns an array of `NameObj`s - essentially small objects bearing
 * the names of the objects in the input array
 */
export const buildNodes = (nodes: Array<ObjType>): NodeObj => {
  var nobj = {};
  for (const node of nodes) {
    let nm = getNameObj(node);
    nobj[nm.label] = node;
  }
  return nobj;
};

/**@function
 *
 * @param nodes - An array of objects
 * @param edges - an array of corresponding edges in the form serialized by rust
 * @returns an array of edges in the form required
 */
export const buildEdges = (
  nodes: Array<ObjType>,
  edges: Array<[number, number, null]>
): EdgeType[] => {
  var nedges: Array<EdgeType> = [];
  for (const edge of edges) {
    const source = getName(nodes[edge[0]]);
    const target = getName(nodes[edge[1]]);
    nedges.push([source, target, {}]);
  }
  return nedges;
};
