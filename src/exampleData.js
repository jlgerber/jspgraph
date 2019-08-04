export default function example() {
  return `
  digraph{
    
    0 [label="Root"]
    1 [label="DD"]
    2 [label="shows"]
    3 [label="show"]
    4 [label="REF"]
    5 [label="quicktimes"]
    6 [label="num_n_under"]
    7 [label="CLIENT_VAULT"]
    8 [label="clientvault_subdir"]
    9 [label="clientvault_ssd"]
    10 [label="slatesNcategories"]
    11 [label="lower_num_dot_dash_under"]
    12 [label="LOCATIONS"]
    13 [label="lower_num_dot_dash_under"]
    14 [label="lower_num_dot_dash_under"]
    15 [label="documents"]
    16 [label="doc_sd"]
    17 [label="audio"]
    18 [label="audio_sd"]
    19 [label="threed"]
    20 [label="threed_sd"]
    21 [label="CHARACTERS"]
    22 [label="chars_sd"]
    23 [label="tools"]
    24 [label="logs"]
    25 [label="package"]
    26 [label="extension"]
    27 [label="bin"]
    28 [label="etc"]
    29 [label="lib"]
    30 [label="libsd_re"]
    31 [label="prod"]
    32 [label="docs"]
    33 [label="user"]
    34 [label="work"]
    35 [label="SHARED"]
    36 [label="depts"]
    37 [label="category"]
    38 [label="department"]
    39 [label="subcontext"]
    40 [label="snapshot_type"]
    41 [label="ASSETDEV"]
    42 [label="adshot"]
    43 [label="client_dd_edit"]
    44 [label="client_dd_edit_sd"]
    45 [label="color"]
    46 [label="OUTSOURCE"]
    47 [label="outsource_sd"]
    48 [label="outsource_ssd"]
    49 [label="FINALS"]
    50 [label="finals_sd"]
    51 [label="conform"]
    52 [label="conform_sd"]
    53 [label="ARTDEPT"]
    54 [label="artdept_sd"]
    55 [label="STORYBOARD"]
    56 [label="storyboard_sd"]
    57 [label="EDITORIAL"]
    58 [label="film_lens"]
    59 [label="DAILIES"]
    60 [label="sequence"]
    61 [label="shot"]
    0->1
    1->2
    2->3
    3->60
    60->61
    35->36
    36->37
    37->38
    38->39
    39->40
    33->34
    4->7
    7->8
    8->9
    4->10
    10->11
    4->12
    12->13
    13->14
    4->15
    15->16
    4->17
    17->18
    4->19
    19->20
    4->21
    21->22
    4->5
    5->6
    23->25
    23->26
    23->27
    23->28
    3->23
    3->24
    3->28
    3->4
    3->28
    3->45
    3->33
    3->43
    43->44
    3->35
    3->29
    29->30
    3->31
    3->32
    3->46
    46->47
    47->48
    3->49
    49->50
    3->53
    53->54
    3->55
    55->56
    3->57
    3->58
    3->51
    3->41
    41->42
    3->59
    51->33
    51->35
    51->52
    51->32
    51->31
    60->28
    60->23
    60->33
    60->35
    60->29
    60->31
    61->23
    61->28
    61->35
    61->33
    61->29
    61->31
    61->23
    42->28
    42->35
    42->33
    42->31
    }  
  `;
}
export function minimal_dot() {
  return `
  digraph{
    
    0 [label="Root"]
    1 [label="DD"]
    
    0->1
    
    }  
  `;
};

export function minimal() {
  return (
    {
      "nodes": [
        {
          "identity": "Root",
          "entry_type": "Root",
          "metadata": {
            "autocreate": false
          }
        },
        {
          "identity": {
            "Simple": "dd"
          },
          "entry_type": "Directory",
          "metadata": {
            "autocreate": false
          }
        },
        {
          "identity": {
            "Simple": "shows"
          },
          "entry_type": "Directory",
          "metadata": {
            "autocreate": false
          }
        },
        {
          "identity": {
            "RegEx": {
              "name": "show",
              "pattern": "^[A-Z]+[A-Z0-9]*$",
              "exclude": "^(REF|SHARED|OUTSOURCE|LOCATIONS|DAILIES)$"
            }
          },
          "entry_type": "Directory",
          "metadata": {
            "owner": {
              "Named": "jobsys"
            },
            "perms": "751",
            "varname": "DD_SHOW",
            "autocreate": false
          }
        },
        {
          "identity": {
            "Simple": "REF"
          },
          "entry_type": "Volume",
          "metadata": {
            "autocreate": false
          }
        },
        {
          "identity": {
            "Simple": "quicktimes"
          },
          "entry_type": "Directory",
          "metadata": {
            "perms": "751",
            "autocreate": false
          }
        },
        {
          "identity": {
            "RegEx": {
              "name": "num_n_under",
              "pattern": "^[0-9_]+$"
            }
          },
          "entry_type": "Directory",
          "metadata": {
            "autocreate": false
          }
        },
        {
          "identity": {
            "Simple": "CLIENT_VAULT"
          },
          "entry_type": "Volume",
          "metadata": {
            "autocreate": false
          }
        },
        {
          "identity": {
            "RegEx": {
              "name": "clientvault_subdir",
              "pattern": "^(incoming|outgoing)$"
            }
          },
          "entry_type": "Directory",
          "metadata": {
            "autocreate": false
          }
        },
        {
          "identity": {
            "RegEx": {
              "name": "clientvault_ssd",
              "pattern": "^[0-9_]+$"
            }
          },
          "entry_type": "Directory",
          "metadata": {
            "autocreate": false
          }
        },
        {
          "identity": {
            "RegEx": {
              "name": "slatesNcategories",
              "pattern": "^(SLATES|CATGORIES)$"
            }
          },
          "entry_type": "Directory",
          "metadata": {
            "autocreate": false
          }
        },
        {
          "identity": {
            "RegEx": {
              "name": "lower_num_dot_dash_under",
              "pattern": "^[a-z0-9._-]$"
            }
          },
          "entry_type": "Directory",
          "metadata": {
            "autocreate": false
          }
        },
        {
          "identity": {
            "Simple": "LOCATIONS"
          },
          "entry_type": "Directory",
          "metadata": {
            "autocreate": false
          }
        },
        {
          "identity": {
            "RegEx": {
              "name": "lower_num_dot_dash_under",
              "pattern": "^[a-z0-9._-]$"
            }
          },
          "entry_type": "Directory",
          "metadata": {
            "autocreate": false
          }
        },
        {
          "identity": {
            "RegEx": {
              "name": "lower_num_dot_dash_under",
              "pattern": "^[a-z0-9._-]$"
            }
          },
          "entry_type": "Directory",
          "metadata": {
            "autocreate": false
          }
        },
        {
          "identity": {
            "Simple": "documents"
          },
          "entry_type": "Directory",
          "metadata": {
            "autocreate": false
          }
        },
        {
          "identity": {
            "RegEx": {
              "name": "doc_sd",
              "pattern": "^(agency|director_treatments|vfx_methodology|schedules|scripts|storyboards)$"
            }
          },
          "entry_type": "Directory",
          "metadata": {
            "autocreate": false
          }
        },
        {
          "identity": {
            "Simple": "audio"
          },
          "entry_type": "Directory",
          "metadata": {
            "autocreate": false
          }
        },
        {
          "identity": {
            "RegEx": {
              "name": "audio_sd",
              "pattern": "^(mixes|sources)$"
            }
          },
          "entry_type": "Directory",
          "metadata": {
            "autocreate": false
          }
        },
        {
          "identity": {
            "RegEx": {
              "name": "threed",
              "pattern": "^3d$"
            }
          },
          "entry_type": "Directory",
          "metadata": {
            "autocreate": false
          }
        },
        {
          "identity": {
            "RegEx": {
              "name": "threed_sd",
              "pattern": "^(3d_assets|mocap)$"
            }
          },
          "entry_type": "Directory",
          "metadata": {
            "autocreate": false
          }
        },
        {
          "identity": {
            "Simple": "CHARACTERS"
          },
          "entry_type": "Directory",
          "metadata": {
            "autocreate": false
          }
        },
        {
          "identity": {
            "RegEx": {
              "name": "chars_sd",
              "pattern": "^[a-z0-9_]+$",
              "exclude": "^(DEVL|SHARED|etc|lib|bin|user)$"
            }
          },
          "entry_type": "Directory",
          "metadata": {
            "autocreate": false
          }
        },
        {
          "identity": {
            "Simple": "tools"
          },
          "entry_type": "Directory",
          "metadata": {
            "owner": {
              "Named": "jobsys"
            },
            "perms": "0751",
            "autocreate": false
          }
        },
        {
          "identity": {
            "Simple": "logs"
          },
          "entry_type": "Directory",
          "metadata": {
            "perms": "0771",
            "autocreate": true
          }
        },
        {
          "identity": {
            "Simple": "package"
          },
          "entry_type": "Directory",
          "metadata": {
            "autocreate": false
          }
        },
        {
          "identity": {
            "Simple": "extension"
          },
          "entry_type": "Directory",
          "metadata": {
            "autocreate": false
          }
        },
        {
          "identity": {
            "Simple": "bin"
          },
          "entry_type": "Directory",
          "metadata": {
            "autocreate": false
          }
        },
        {
          "identity": {
            "Simple": "etc"
          },
          "entry_type": "Directory",
          "metadata": {
            "owner": {
              "Named": "jobsys"
            },
            "perms": "0751",
            "autocreate": true,
            "navalias": {
              "Simple": "etc"
            }
          }
        },
        {
          "identity": {
            "Simple": "lib"
          },
          "entry_type": "Directory",
          "metadata": {
            "owner": {
              "Named": "jobsys"
            },
            "autocreate": true
          }
        },
        {
          "identity": {
            "RegEx": {
              "name": "libsd_re",
              "pattern": "^(config|cortex|dmx|houdini|integ|jspools|katana|lw|massive|max|maya|mentalray|mkfoldy|moco|mova|nfb|nuke|perl|python[0-9.]*|race|refchef|rman|scratch|setupenv|shader|shoot2x|submission|vray|wam|web)$"
            }
          },
          "entry_type": "Directory",
          "metadata": {
            "perms": "0771",
            "autocreate": false
          }
        },
        {
          "identity": {
            "Simple": "prod"
          },
          "entry_type": "Directory",
          "metadata": {
            "perms": "755",
            "autocreate": true
          }
        },
        {
          "identity": {
            "Simple": "docs"
          },
          "entry_type": "Directory",
          "metadata": {
            "perms": "771",
            "autocreate": false
          }
        },
        {
          "identity": {
            "Simple": "user"
          },
          "entry_type": "Volume",
          "metadata": {
            "perms": "751",
            "autocreate": false
          }
        },
        {
          "identity": {
            "RegEx": {
              "name": "work",
              "pattern": "^work\\.(?P<work>[a-z]+)$"
            }
          },
          "entry_type": "Directory",
          "metadata": {
            "owner": {
              "Captured": "work"
            },
            "perms": "770",
            "varname": "DD_WORK",
            "autocreate": false,
            "navalias": {
              "Complex": {
                "name": "cs",
                "value": "work.$USER"
              }
            }
          }
        },
        {
          "identity": {
            "Simple": "SHARED"
          },
          "entry_type": "Directory",
          "metadata": {
            "autocreate": false
          }
        },
        {
          "identity": {
            "RegEx": {
              "name": "depts",
              "pattern": "^(PREVIZ|INTEG|MODEL|RIG|ANIM|CFX|LIGHT|ENVIRO|FX|COMP|IMG)$"
            }
          },
          "entry_type": "Directory",
          "metadata": {
            "autocreate": false
          }
        },
        {
          "identity": {
            "RegEx": {
              "name": "category",
              "pattern": "^(char|prop|veh|scene|enviro|kit)$"
            }
          },
          "entry_type": "Directory",
          "metadata": {
            "varname": "DD_CATEGORY",
            "autocreate": false
          }
        },
        {
          "identity": {
            "RegEx": {
              "name": "department",
              "pattern": "^(integ|model|previz|postviz|enviro|rig|anim|fx|cfx|light|comp|lookdev|shotmodel)$"
            }
          },
          "entry_type": "Directory",
          "metadata": {
            "autocreate": false
          }
        },
        {
          "identity": {
            "RegEx": {
              "name": "subcontext",
              "pattern": "^[a-z]+([_]{0,1}[a-z0-9])*$"
            }
          },
          "entry_type": "Directory",
          "metadata": {
            "varname": "DD_SUBCONTEXT",
            "autocreate": false
          }
        },
        {
          "identity": {
            "RegEx": {
              "name": "snapshot_type",
              "pattern": "^[a-z]+([_]{0,1}[a-z0-9])*$"
            }
          },
          "entry_type": "Directory",
          "metadata": {
            "autocreate": false
          }
        },
        {
          "identity": {
            "Simple": "ASSETDEV"
          },
          "entry_type": "Directory",
          "metadata": {
            "varname": "DD_SEQUENCE",
            "autocreate": false
          }
        },
        {
          "identity": {
            "RegEx": {
              "name": "adshot",
              "pattern": "^([A-Z][A-Z0-9]+[_]{0,1})+[A-Z0-9]+$"
            }
          },
          "entry_type": "Directory",
          "metadata": {
            "varname": "DD_SHOT",
            "autocreate": false
          }
        },
        {
          "identity": {
            "RegEx": {
              "name": "client_dd_edit",
              "pattern": "^(CLIENT|DD)$"
            }
          },
          "entry_type": "Volume",
          "metadata": {
            "autocreate": false
          }
        },
        {
          "identity": {
            "RegEx": {
              "name": "client_dd_edit_sd",
              "pattern": "^(([0-9]{4,5})|([0-9]{1,2}?[a-z]+)|([a-z]{2}[0-9]{4,5}))$"
            }
          },
          "entry_type": "Directory",
          "metadata": {
            "autocreate": false
          }
        },
        {
          "identity": {
            "Simple": "color"
          },
          "entry_type": "Directory",
          "metadata": {
            "autocreate": false
          }
        },
        {
          "identity": {
            "Simple": "OUTSOURCE"
          },
          "entry_type": "Volume",
          "metadata": {
            "autocreate": false
          }
        },
        {
          "identity": {
            "RegEx": {
              "name": "outsource_sd",
              "pattern": "^[a-zA-Z0-9_.]$"
            }
          },
          "entry_type": "Directory",
          "metadata": {
            "autocreate": false
          }
        },
        {
          "identity": {
            "RegEx": {
              "name": "outsource_ssd",
              "pattern": "^[a-zA-Z0-9_.]+$",
              "exclude": "^(\\bprod\\b)$"
            }
          },
          "entry_type": "Directory",
          "metadata": {
            "perms": "770",
            "autocreate": false
          }
        },
        {
          "identity": {
            "Simple": "FINALS"
          },
          "entry_type": "Directory",
          "metadata": {
            "perms": "750",
            "autocreate": false
          }
        },
        {
          "identity": {
            "RegEx": {
              "name": "finals_sd",
              "pattern": "^[0-9_]+$"
            }
          },
          "entry_type": "Directory",
          "metadata": {
            "autocreate": false
          }
        },
        {
          "identity": {
            "RegEx": {
              "name": "conform",
              "pattern": "^CONFORM$"
            }
          },
          "entry_type": "Directory",
          "metadata": {
            "autocreate": false
          }
        },
        {
          "identity": {
            "RegEx": {
              "name": "conform_sd",
              "pattern": "^[a-z0-9_]+$",
              "exclude": "^(user|docs|prod)$"
            }
          },
          "entry_type": "Directory",
          "metadata": {
            "autocreate": false
          }
        },
        {
          "identity": {
            "Simple": "ARTDEPT"
          },
          "entry_type": "Directory",
          "metadata": {
            "autocreate": false
          }
        },
        {
          "identity": {
            "RegEx": {
              "name": "artdept_sd",
              "pattern": "^[a-zA-Z0-9_.-]+$"
            }
          },
          "entry_type": "Directory",
          "metadata": {
            "perms": "770",
            "autocreate": false
          }
        },
        {
          "identity": {
            "Simple": "STORYBOARD"
          },
          "entry_type": "Directory",
          "metadata": {
            "autocreate": false
          }
        },
        {
          "identity": {
            "RegEx": {
              "name": "storyboard_sd",
              "pattern": "^[0-9]{2}_[0-9]{4}$"
            }
          },
          "entry_type": "Directory",
          "metadata": {
            "perms": "770",
            "autocreate": false
          }
        },
        {
          "identity": {
            "Simple": "EDITORIAL"
          },
          "entry_type": "Directory",
          "metadata": {
            "autocreate": false
          }
        },
        {
          "identity": {
            "RegEx": {
              "name": "film_lens",
              "pattern": "^(FILM|LENS)$"
            }
          },
          "entry_type": "Directory",
          "metadata": {
            "autocreate": false
          }
        },
        {
          "identity": {
            "Simple": "DAILIES"
          },
          "entry_type": "Directory",
          "metadata": {
            "autocreate": false
          }
        },
        {
          "identity": {
            "RegEx": {
              "name": "sequence",
              "pattern": "^(([A-Z]{2,4})|LIBRARY)$",
              "exclude": "^(SHARED|REF|OUTSOURCE|LOCATIONS|DAILIES)$"
            }
          },
          "entry_type": "Directory",
          "metadata": {
            "varname": "DD_SEQUENCE",
            "autocreate": false
          }
        },
        {
          "identity": {
            "RegEx": {
              "name": "shot",
              "pattern": "^[0-9]+[A-Z0-9]*$"
            }
          },
          "entry_type": "Directory",
          "metadata": {
            "varname": "DD_SHOT",
            "autocreate": false
          }
        }
      ],
      "node_holes": [],
      "edge_property": "directed",
      "edges": [
        [
          0,
          1,
          null
        ],
        [
          1,
          2,
          null
        ],
        [
          2,
          3,
          null
        ],
        [
          3,
          60,
          null
        ],
        [
          60,
          61,
          null
        ],
        [
          35,
          36,
          null
        ],
        [
          36,
          37,
          null
        ],
        [
          37,
          38,
          null
        ],
        [
          38,
          39,
          null
        ],
        [
          39,
          40,
          null
        ],
        [
          33,
          34,
          null
        ],
        [
          4,
          7,
          null
        ],
        [
          7,
          8,
          null
        ],
        [
          8,
          9,
          null
        ],
        [
          4,
          10,
          null
        ],
        [
          10,
          11,
          null
        ],
        [
          4,
          12,
          null
        ],
        [
          12,
          13,
          null
        ],
        [
          13,
          14,
          null
        ],
        [
          4,
          15,
          null
        ],
        [
          15,
          16,
          null
        ],
        [
          4,
          17,
          null
        ],
        [
          17,
          18,
          null
        ],
        [
          4,
          19,
          null
        ],
        [
          19,
          20,
          null
        ],
        [
          4,
          21,
          null
        ],
        [
          21,
          22,
          null
        ],
        [
          4,
          5,
          null
        ],
        [
          5,
          6,
          null
        ],
        [
          23,
          25,
          null
        ],
        [
          23,
          26,
          null
        ],
        [
          23,
          27,
          null
        ],
        [
          23,
          28,
          null
        ],
        [
          3,
          23,
          null
        ],
        [
          3,
          24,
          null
        ],
        [
          3,
          28,
          null
        ],
        [
          3,
          4,
          null
        ],
        [
          3,
          28,
          null
        ],
        [
          3,
          45,
          null
        ],
        [
          3,
          33,
          null
        ],
        [
          3,
          43,
          null
        ],
        [
          43,
          44,
          null
        ],
        [
          3,
          35,
          null
        ],
        [
          3,
          29,
          null
        ],
        [
          29,
          30,
          null
        ],
        [
          3,
          31,
          null
        ],
        [
          3,
          32,
          null
        ],
        [
          3,
          46,
          null
        ],
        [
          46,
          47,
          null
        ],
        [
          47,
          48,
          null
        ],
        [
          3,
          49,
          null
        ],
        [
          49,
          50,
          null
        ],
        [
          3,
          53,
          null
        ],
        [
          53,
          54,
          null
        ],
        [
          3,
          55,
          null
        ],
        [
          55,
          56,
          null
        ],
        [
          3,
          57,
          null
        ],
        [
          3,
          58,
          null
        ],
        [
          3,
          51,
          null
        ],
        [
          3,
          41,
          null
        ],
        [
          41,
          42,
          null
        ],
        [
          3,
          59,
          null
        ],
        [
          3,
          51,
          null
        ],
        [
          51,
          33,
          null
        ],
        [
          51,
          35,
          null
        ],
        [
          51,
          52,
          null
        ],
        [
          51,
          32,
          null
        ],
        [
          51,
          31,
          null
        ],
        [
          60,
          28,
          null
        ],
        [
          60,
          23,
          null
        ],
        [
          60,
          33,
          null
        ],
        [
          60,
          35,
          null
        ],
        [
          60,
          29,
          null
        ],
        [
          60,
          31,
          null
        ],
        [
          61,
          23,
          null
        ],
        [
          61,
          28,
          null
        ],
        [
          61,
          35,
          null
        ],
        [
          61,
          33,
          null
        ],
        [
          61,
          29,
          null
        ],
        [
          61,
          31,
          null
        ],
        [
          61,
          23,
          null
        ],
        [
          42,
          28,
          null
        ],
        [
          42,
          35,
          null
        ],
        [
          42,
          33,
          null
        ],
        [
          42,
          31,
          null
        ]
      ]
    }
  );

}
