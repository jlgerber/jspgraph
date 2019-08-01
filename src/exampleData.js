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
export function minimal() {
  return `
  digraph{
    
    0 [label="Root"]
    1 [label="DD"]
    
    0->1
    
    }  
  `;
}
