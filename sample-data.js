const SAMPLE_API_DATA = {
  "workers": {
    "A001": {
      "id": "A001",
      "status": "Online",
      "phoneNumber": "+1 (555) 123-4501",
      "assignedCompany": "TechCorp",
      "serialNumber": "SN-A987XYZ101",
      "IMEI": "358901234567801"
    },
    "A002": {
      "id": "A002",
      "status": "Online",
      "phoneNumber": "+1 (555) 123-4502",
      "assignedCompany": "LogiMove",
      "serialNumber": "SN-A987XYZ102",
      "IMEI": "358901234567802"
    },
    "A003": {
      "id": "A003",
      "status": "Degraded",
      "phoneNumber": "555-867-5303",
      "assignedCompany": "AlphaDispatch",
      "serialNumber": "SN-B987XYZ103",
      "IMEI": "358901234567803"
    },
    "A004": {
      "id": "A004",
      "status": "Online",
      "phoneNumber": "+1 (555) 123-4504",
      "assignedCompany": "BetaServices",
      "serialNumber": "SN-B987XYZ104",
      "IMEI": "358901234567804"
    },
    "A005": {
      "id": "A005",
      "status": "Offline",
      "phoneNumber": "+1 (555) 123-4505",
      "assignedCompany": "ZetaLogistics",
      "serialNumber": "SN-C987XYZ105",
      "IMEI": "358901234567805"
    },
    "A006": {
      "id": "A006",
      "status": "Online",
      "phoneNumber": "2125550006",
      "assignedCompany": "TechCorp",
      "serialNumber": "SN-C987XYZ106",
      "IMEI": "358901234567806"
    },
    "A007": {
      "id": "A007",
      "status": "Online",
      "phoneNumber": "+1 (555) 123-4507",
      "assignedCompany": "LogiMove",
      "serialNumber": "SN-A987XYZ107",
      "IMEI": "358901234567807"
    },
    "A008": {
      "id": "A008",
      "status": "Online",
      "phoneNumber": "+1 (555) 123-4508",
      "assignedCompany": "AlphaDispatch",
      "serialNumber": "SN-B987XYZ108",
      "IMEI": "358901234567808"
    },
    "A009": {
      "id": "A009",
      "status": "Online",
      "phoneNumber": "+1 (555) 123-4509",
      "assignedCompany": "BetaServices",
      "serialNumber": "SN-B987XYZ109",
      "IMEI": "358901234567809"
    },
    "A010": {
      "id": "A010",
      "status": "Online",
      "phoneNumber": "+1 (555) 123-4510",
      "assignedCompany": "ZetaLogistics",
      "serialNumber": "SN-C987XYZ110",
      "IMEI": "358901234567810"
    },
    "B011": {
      "id": "B011",
      "status": "Online",
      "phoneNumber": "+1 (555) 222-3311",
      "assignedCompany": "TechCorp",
      "serialNumber": "SN-D222XYZ111",
      "IMEI": "358902234567811"
    },
    "B012": {
      "id": "B012",
      "status": "Online",
      "phoneNumber": "+1 (555) 222-3312",
      "assignedCompany": "LogiMove",
      "serialNumber": "SN-D222XYZ112",
      "IMEI": "358902234567812"
    },
    "B013": {
      "id": "B013",
      "status": "Online",
      "phoneNumber": "+1 (555) 222-3313",
      "assignedCompany": "AlphaDispatch",
      "serialNumber": "SN-E222XYZ113",
      "IMEI": "358902234567813"
    },
    "B014": {
      "id": "B014",
      "status": "Degraded",
      "phoneNumber": "+1 (555) 222-3314",
      "assignedCompany": "BetaServices",
      "serialNumber": "SN-E222XYZ114",
      "IMEI": "358902234567814"
    },
    "B015": {
      "id": "B015",
      "status": "Online",
      "phoneNumber": "5552223315",
      "assignedCompany": "ZetaLogistics",
      "serialNumber": "SN-F222XYZ115",
      "IMEI": "358902234567815"
    },
    "B016": {
      "id": "B016",
      "status": "Online",
      "phoneNumber": "+1 (555) 222-3316",
      "assignedCompany": "TechCorp",
      "serialNumber": "SN-F222XYZ116",
      "IMEI": "358902234567816"
    },
    "B017": {
      "id": "B017",
      "status": "Online",
      "phoneNumber": "+1 (555) 222-3317",
      "assignedCompany": "LogiMove",
      "serialNumber": "SN-D222XYZ117",
      "IMEI": "358902234567817"
    },
    "B018": {
      "id": "B018",
      "status": "Offline",
      "phoneNumber": "+1 (555) 222-3318",
      "assignedCompany": "AlphaDispatch",
      "serialNumber": "SN-E222XYZ118",
      "IMEI": "358902234567818"
    },
    "B019": {
      "id": "B019",
      "status": "Online",
      "phoneNumber": "555-222-3319",
      "assignedCompany": "BetaServices",
      "serialNumber": "SN-E222XYZ119",
      "IMEI": "358902234567819"
    },
    "B020": {
      "id": "B020",
      "status": "Online",
      "phoneNumber": "+1 (555) 222-3320",
      "assignedCompany": "ZetaLogistics",
      "serialNumber": "SN-F222XYZ120",
      "IMEI": "358902234567820"
    },
    "C021": {
      "id": "C021",
      "status": "Online",
      "phoneNumber": "+1 (555) 123-4521",
      "assignedCompany": "TechCorp",
      "serialNumber": "SN-A987XYZ121",
      "IMEI": "358901234567821"
    },
    "C022": {
      "id": "C022",
      "status": "Online",
      "phoneNumber": "+1 (555) 123-4522",
      "assignedCompany": "LogiMove",
      "serialNumber": "SN-A987XYZ122",
      "IMEI": "358901234567822"
    },
    "C023": {
      "id": "C023",
      "status": "Online",
      "phoneNumber": "+1 (555) 123-4523",
      "assignedCompany": "AlphaDispatch",
      "serialNumber": "SN-B987XYZ123",
      "IMEI": "358901234567823"
    },
    "C024": {
      "id": "C024",
      "status": "Online",
      "phoneNumber": "+1 (555) 123-4524",
      "assignedCompany": "BetaServices",
      "serialNumber": "SN-B987XYZ124",
      "IMEI": "358901234567824"
    },
    "C025": {
      "id": "C025",
      "status": "Online",
      "phoneNumber": "+1 (555) 123-4525",
      "assignedCompany": "ZetaLogistics",
      "serialNumber": "SN-C987XYZ125",
      "IMEI": "358901234567825"
    },
    "C026": {
      "id": "C026",
      "status": "Online",
      "phoneNumber": "+1 (555) 123-4526",
      "assignedCompany": "TechCorp",
      "serialNumber": "SN-C987XYZ126",
      "IMEI": "358901234567826"
    },
    "C027": {
      "id": "C027",
      "status": "Degraded",
      "phoneNumber": "+1 (555) 123-4527",
      "assignedCompany": "LogiMove",
      "serialNumber": "SN-A987XYZ127",
      "IMEI": "358901234567827"
    },
    "C028": {
      "id": "C028",
      "status": "Online",
      "phoneNumber": "555-123-4528",
      "assignedCompany": "AlphaDispatch",
      "serialNumber": "SN-B987XYZ128",
      "IMEI": "358901234567828"
    },
    "C029": {
      "id": "C029",
      "status": "Online",
      "phoneNumber": "+1 (555) 123-4529",
      "assignedCompany": "BetaServices",
      "serialNumber": "SN-B987XYZ129",
      "IMEI": "358901234567829"
    },
    "C030": {
      "id": "C030",
      "status": "Online",
      "phoneNumber": "+1 (555) 123-4530",
      "assignedCompany": "ZetaLogistics",
      "serialNumber": "SN-C987XYZ130",
      "IMEI": "358901234567830"
    },
    "D031": {
      "id": "D031",
      "status": "Online",
      "phoneNumber": "+1 (555) 222-3331",
      "assignedCompany": "TechCorp",
      "serialNumber": "SN-D222XYZ131",
      "IMEI": "358902234567831"
    },
    "D032": {
      "id": "D032",
      "status": "Online",
      "phoneNumber": "+1 (555) 222-3332",
      "assignedCompany": "LogiMove",
      "serialNumber": "SN-D222XYZ132",
      "IMEI": "358902234567832"
    },
    "D033": {
      "id": "D033",
      "status": "Online",
      "phoneNumber": "+1 (555) 222-3333",
      "assignedCompany": "AlphaDispatch",
      "serialNumber": "SN-E222XYZ133",
      "IMEI": "358902234567833"
    },
    "D034": {
      "id": "D034",
      "status": "Online",
      "phoneNumber": "+1 (555) 222-3334",
      "assignedCompany": "BetaServices",
      "serialNumber": "SN-E222XYZ134",
      "IMEI": "358902234567834"
    },
    "D035": {
      "id": "D035",
      "status": "Offline",
      "phoneNumber": "+1 (555) 222-3335",
      "assignedCompany": "ZetaLogistics",
      "serialNumber": "SN-F222XYZ135",
      "IMEI": "358902234567835"
    },
    "D036": {
      "id": "D036",
      "status": "Online",
      "phoneNumber": "+1 (555) 222-3336",
      "assignedCompany": "TechCorp",
      "serialNumber": "SN-F222XYZ136",
      "IMEI": "358902234567836"
    },
    "D037": {
      "id": "D037",
      "status": "Online",
      "phoneNumber": "555-222-3337",
      "assignedCompany": "LogiMove",
      "serialNumber": "SN-D222XYZ137",
      "IMEI": "358902234567837"
    },
    "D038": {
      "id": "D038",
      "status": "Online",
      "phoneNumber": "+1 (555) 222-3338",
      "assignedCompany": "AlphaDispatch",
      "serialNumber": "SN-E222XYZ138",
      "IMEI": "358902234567838"
    },
    "D039": {
      "id": "D039",
      "status": "Online",
      "phoneNumber": "+1 (555) 222-3339",
      "assignedCompany": "BetaServices",
      "serialNumber": "SN-E222XYZ139",
      "IMEI": "358902234567839"
    },
    "D040": {
      "id": "D040",
      "status": "Online",
      "phoneNumber": "+1 (555) 222-3340",
      "assignedCompany": "ZetaLogistics",
      "serialNumber": "SN-F222XYZ140",
      "IMEI": "358902234567840"
    },
    "E041": {
      "id": "E041",
      "status": "Online",
      "phoneNumber": "+1 (555) 123-4541",
      "assignedCompany": "TechCorp",
      "serialNumber": "SN-A987XYZ141",
      "IMEI": "358901234567841"
    },
    "E042": {
      "id": "E042",
      "status": "Online",
      "phoneNumber": "+1 (555) 123-4542",
      "assignedCompany": "LogiMove",
      "serialNumber": "SN-A987XYZ142",
      "IMEI": "358901234567842"
    },
    "E043": {
      "id": "E043",
      "status": "Online",
      "phoneNumber": "+1 (555) 123-4543",
      "assignedCompany": "AlphaDispatch",
      "serialNumber": "SN-B987XYZ143",
      "IMEI": "358901234567843"
    },
    "E044": {
      "id": "E044",
      "status": "Online",
      "phoneNumber": "5551234544",
      "assignedCompany": "BetaServices",
      "serialNumber": "SN-B987XYZ144",
      "IMEI": "358901234567844"
    },
    "E045": {
      "id": "E045",
      "status": "Online",
      "phoneNumber": "+1 (555) 123-4545",
      "assignedCompany": "ZetaLogistics",
      "serialNumber": "SN-C987XYZ145",
      "IMEI": "358901234567845"
    },
    "E046": {
      "id": "E046",
      "status": "Degraded",
      "phoneNumber": "+1 (555) 123-4546",
      "assignedCompany": "TechCorp",
      "serialNumber": "SN-C987XYZ146",
      "IMEI": "358901234567846"
    },
    "E047": {
      "id": "E047",
      "status": "Online",
      "phoneNumber": "+1 (555) 123-4547",
      "assignedCompany": "LogiMove",
      "serialNumber": "SN-A987XYZ147",
      "IMEI": "358901234567847"
    },
    "E048": {
      "id": "E048",
      "status": "Online",
      "phoneNumber": "+1 (555) 123-4548",
      "assignedCompany": "AlphaDispatch",
      "serialNumber": "SN-B987XYZ148",
      "IMEI": "358901234567848"
    },
    "E049": {
      "id": "E049",
      "status": "Online",
      "phoneNumber": "+1 (555) 123-4549",
      "assignedCompany": "BetaServices",
      "serialNumber": "SN-B987XYZ149",
      "IMEI": "358901234567849"
    },
    "E050": {
      "id": "E050",
      "status": "Online",
      "phoneNumber": "N/A",
      "assignedCompany": "ZetaLogistics",
      "serialNumber": "N/A",
      "IMEI": "358901234567850"
    }
  }
}