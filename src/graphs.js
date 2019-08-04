let graphs = {
  simple: {
    nodes: {
      "1": {
        label: "Node 1"
      },
      "2": {
        label: "Node 2"
      },
      "3": {
        label: "Node 3"
      },
      "4": {
        label: "Node 4"
      }
    },
    edges: [["1", "2", {}], ["1", "3", {}], ["2", "4", {}], ["3", "4", {}]]
  },
  simple2: {
    nodes: {
      1: {
        label: "Node 1"
      },
      2: {
        label: "Node 22"
      },
      3: {
        label: "Node 3"
      },
      4: {
        label: "Node 4"
      }
    },
    edges: [[1, 2, {}], [1, 3, {}], [2, 4, {}], [3, 4, {}]]
  },
  medium: {
    nodes: {
      "1": {},
      "2": {},
      "3": {},
      "4": {},
      "5": {},
      "6": {}
    },
    edges: [
      ["1", "2", {}],
      ["1", "3", {}],
      ["2", "4", {}],
      ["3", "4", {}],
      ["4", "5", {}],
      ["1", "6", {}],
      ["5", "6", {}]
    ]
  },
  large: {
    nodes: {
      "1": {},
      "2": {},
      "3": {},
      "4": {},
      "5": {},
      "6": {},
      "7": {},
      "8": {},
      "9": {},
      "10": {},
      "11": {},
      "12": {}
    },
    edges: [
      ["1", "2", {}],
      ["1", "5", {}],
      ["2", "3", {}],
      ["3", "4", {}],
      ["5", "6", {}],
      ["5", "7", {}],
      ["5", "8", {}],
      ["6", "9", {}],
      ["7", "10", {}],
      ["2", "9", {}],
      ["2", "10", {}],
      ["9", "11", {}],
      ["10", "11", {}],
      ["11", "12", {}]
    ]
  }
};

export default graphs;
