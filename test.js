name: "profile.age"
values: [65]

      "content": {
        "type": "object",
        "properties": {
          "profile": {
            "title": "Basic Profile",
            "type": "object",
            "properties": {
              "chr_no": {
                "title": "Chart No",
                "type": "string",
                "attrs": {
                  "inputGroup": true,
                  "bsColSize": 4
                }
              },
              "name": {
                "title": "Name",
                "type": "string",
                "attrs": {
                  "inputGroup": true,
                  "bsColSize": 4,
                  "placeholder": "Patient Name"                
                }
              },
              "birthdate": {
                "title": "Birth Date",
                "format": "date",
                "type": "string",
                "attrs": {
                  "fieldType": "date",
                  "bsColSize": 4
                }
              },
              "age": {
                "title": "Age",
                "type": "integer",
                "attrs": {
                  "inputGroup": true,
                  "bsColSize": 4
                }
              },
              "id_no": {
                "title": "ID",
                "type": "string",
                "attrs": {
                  "inputGroup": true,
                  "bsColSize": 4
                }
              },
              "sex": {
                "title": "Gender",
                "type": "string",
                "attrs": {
                  "inputGroup": true,
                  "bsColSize": 4
                }
              },
  
              "admit_time": {
                "title": "Time of Admission",
                "format": "date-time",
                "type": "string",
                "attrs": {
                  "fieldType": "date",
                  "bsColSize": 6
                }
              },
              "evaluate_time": {
                "title": "Time of History-taking",
                "format": "date-time",
                "type": "string",
                "attrs": {
                  "fieldType": "date",
                  "bsColSize": 6
                }
              },
              "admit_dept": {
                "title": "Department",
                "type": "string",
                "attrs": {
                  "inputGroup": true,
                  "bsColSize": 6
                }
              },
              "source": {
                "title": "Information Source",
                "type": "string",
                "attrs": {
                  "inputGroup": true,
                  "bsColSize": 6
                }
              }
            }
          },
          "cc": {
            "title": "Chief Complaint",
            "type": "string",
            "attrs": {
              "inputGroup": true,
              "bsColSize": 12
            }
          },
          "pi": {
            "title": "Present Illness",
            "type": "string",
            "attrs": {
              "inputGroup": true,
              "bsColSize": 12
            }
          },
          "travel_contact": {
            "title": "Travel History",
            "type": "string",
            "attrs": {
              "inputGroup": true,
              "bsColSize": 12
            }
          },
          "personal_hx": {
            "title": "Personal History",
            "type": "object",
            "properties": {
              "cigarette": {
                "title": "Smoking",
                "type": "object",
                "attrs": {
                  "styleClass": ["subsection-title"]
                },
                "properties": {
                  "used": {
                    "title": "Used：",
                    "type": "boolean"
                  },
                  "type": {
                    "title": "Type",
                    "type": "array",
                    "items": {
                      "type": "string",
                      "enum": ["Cigarettes", "Electronic cigarettes"]
                    },
                    "attrs": {
                      "dependsOn": {
                        "name": "used",
                        "values": ["Yes"]
                      }
                    }
                  },
                  "quitted": {
                    "title": "Quitted",
                    "type": "boolean",
                    "attrs": {
                      "dependsOn": {
                        "name": "used",
                        "values": ["Yes"]
                      }
                    }
                  },
                  "pack_per_day": {
                    "title": "Packs per day",
                    "type": "number",
                    "attrs": {
                      "inputGroup": true,
                      "bsColSize": 3,
                      "placeholder": "Frequency",
                      "dependsOn": {
                        "name": "used",
                        "values": ["Yes"]
                      }
                    }
                  },
                  "duration": {
                    "title": "for years",
                    "type": "number",
                    "attrs": {
                      "inputGroup": true,
                      "bsColSize": 3,
                      "dependsOn": {
                        "name": "used",
                        "values": ["Yes"]
                      }
                    }
                  },
                  "passive_expose": {
                    "title": "Passive smoking：",
                    "type": "boolean"
                  }
                }
              },
              "alcohol": {
                "title": "Alcohol drinking",
                "type": "object",
                "attrs": {
                  "styleClass": ["subsection-title"]
                },
                "properties": {
                  "used": {
                    "title": "Used：",
                    "type": "boolean"
                  },
                  "quitted": {
                    "title": "Quit use：",
                    "type": "boolean"
                  },
                  "vol_per_day": {
                    "title": "Volumn(ml) per day",
                    "type": "integer",
                    "attrs": {
                      "inputGroup": true,
                      "bsColSize": 5
                    }
                  },
                  "duration": {
                    "title": "for years",
                    "type": "integer",
                    "attrs": {
                      "inputGroup": true,
                      "bsColSize": 5
                    }
                  }
                }
              },
              "betel_nut": {
                "type": "object",
                "title": "Betel Nuts",
                "attrs": {
                  "styleClass": ["subsection-title"]
                },
                "properties": {
                  "used": {
                    "title": "Used：",
                    "type": "boolean"
                  },
                  "quitted": {
                    "title": "Quit use：",
                    "type": "boolean"
                  },
                  "num_per_day": {
                    "title": "Number per day",
                    "type": "integer",
                    "attrs": {
                      "inputGroup": true,
                      "bsColSize": 5
                    }
                  },
                  "duration": {
                    "title": "for years",
                    "type": "integer",
                    "attrs": {
                      "inputGroup": true,
                      "bsColSize": 5
                    }
                  }
                }
              }
            }
          },
          "allergy": {
            "title": "Allergy",
            "type": "object",
            "properties": {
              "list": {
                "type": "array",
                "items": {
                  "type": "object",
                  "properties": {
                    "generic": {
                      "title": "Gerneric name",
                      "type": "string"
                    },
                    "product": {
                      "title": "Gerneric name",
                      "type": "string"
                    }
                  },
                  "adr": {
                    "title": "ADR",
                    "type": "string"
                  }
                }
              }
            },
            "note": {
              "title": "Note",
              "type": "string"
            }
          },
  
          "family_hx": {
            "title": "Family History",
            "type": "object",
            "properties": {
              "familytree": {
                "type": "string",
                "attrs": {
                  "fieldType": "familytree"
                }
              }
            }
          },
          "past_hx": {
            "title": "Past History",
            "type": "object",
            "properties": {
              "note": {
                "title": "Note",
                "type": "string",
                "attrs": {
                  "inputGroup": true,
                  "bsColSize": 12
                }
              }
            }
          },
          "review_of_sys": {
            "title": "Review of the System",
            "type": "object",
            "properties": {
              "general": {
                "title": "General",
                "type": "array",
                "items": {
                  "type": "string"
                },
                "attrs": {
                  "values": [
                    "Weight loss or gain",
                    "Fever",
                    "Chills",
                    "Night sweating",
                    "Fatigue",
                    "Weakness"                  
                  ],
                  "fieldType": "checklistwithother",
                  "styleClass": ["margin-bot-small"]
                }
              },                     
              "skin": {
                "title": "Skin",
                "type": "array",
                "attrs": {
                  "styleClass": ["margin-bot-small"]
                },
                "items": {
                  "type": "string",
                  "enum": [
                    "Pigment changes",
                    "Rashes/Pruritus",
                    "Bruising/Bleeding",
                    "Nevi/Moles",
                    "Dryness/Sweating",
                    "Prior",
                    "Other"
                  ]
                }
              },
              "heent": {
                "title": "HEENT",
                "type": "array",
                "attrs": {
                  "styleClass": ["margin-bot-small"]
                },
                "items": {
                  "type": "string",
                  "enum": [
                    "Head trauma",
                    "Headaches",
                    "Swelling of face",
                    "Sinus infections",
                    "Enlarged thyroid",
                    "Other"
                  ]
                }
              },
              "cardio_resp": {
                "title": "Cardio-Respiratory system",
                "type": "array",
                "attrs": {
                  "styleClass": ["margin-bot-small"]
                },
                "items": {
                  "type": "string",
                  "enum": [
                    "Breathlessness",
                    "Cough",
                    "Voice changes",
                    "Dizziness",
                    "Nausea",
                    "Other"
                  ]
                }
              },
              "gi": {
                "title": "Gastrointestinal system",
                "type": "array",
                "attrs": {
                  "styleClass": ["margin-bot-small"]
                },
                "items": {
                  "type": "string",
                  "enum": [
                    "Weight loss or gain",
                    "Fever",
                    "Chills",
                    "Night sweating",
                    "Fatigue",
                    "Weakness",
                    "Other"
                  ]
                }
              },
              "gu": {
                "title": "Genito-urinary system",
                "type": "array",
                "attrs": {
                  "styleClass": ["margin-bot-small"]
                },
                "items": {
                  "type": "string",
                  "enum": [
                    "Weight loss or gain",
                    "Fever",
                    "Chills",
                    "Night sweating",
                    "Fatigue",
                    "Weakness",
                    "Other"
                  ]
                }
              },
              "neuro": {
                "title": "Neuro-Psychiatric system",
                "type": "array",
                "attrs": {
                  "styleClass": ["margin-bot-small"]
                },
                "items": {
                  "type": "string",
                  "enum": [
                    "Weight loss or gain",
                    "Fever",
                    "Chills",
                    "Night sweating",
                    "Fatigue",
                    "Weakness",
                    "Other"
                  ]
                }
              },
              "mus_ske": {
                "title": "Musculoskeletal system",
                "type": "array",
                "attrs": {
                  "styleClass": ["margin-bot-small"]
                },
                "items": {
                  "type": "string",
                  "enum": [
                    "Weight loss or gain",
                    "Fever",
                    "Chills",
                    "Night sweating",
                    "Fatigue",
                    "Weakness",
                    "Other"
                  ]
                }
              }
            }
          },
          "medication_hx": {
            "title": "Medication history",
            "type": "object",
            "properties": {
              "in_institute": {
                "title": "Inside hospital",
                "type": "string",
                "attrs": {
                  "inputGroup": true,
                  "bsColSize": 12
                }
              },
              "out_institute": {
                "title": "Other hispital/Clinic",
                "type": "string",
                "attrs": {
                  "inputGroup": true,
                  "bsColSize": 12
                }
              }
            }
          },
          "socioeco": {
            "title": "Social/Economic Evaluation",
            "type": "object",
            "properties": {
              "living": {
                "title": "Lives：",
                "type": "string",
                "attrs": {
                  "fieldName": "living",
                  "fieldType": "radio",
                  "values": ["Residential home", "Nursing home", "Homeless"]
                }
              },
              "family": {
                "title": "Family support：",
                "type": "string",
                "attrs": {
                  "fieldName": "family",
                  "fieldType": "radio",
                  "values": ["Well", "Moderate", "Poor"]
                }
              },
              "caregiver": {
                "title": "Main caregiver：",
                "type": "string",
                "attrs": {
                  "fieldName": "caregiver",
                  "fieldType": "radio",
                  "values": ["Couple", "Children", "Other"]
                }
              },
              "finatial": {
                "title": "Financial support：",
                "type": "string",
                "attrs": {
                  "fieldName": "finacial",
                  "fieldType": "radio",
                  "values": ["Sufficient", "Insufficient"]
                }
              }
            }
          },
          "psyco": {
            "title": "Psychological Evaluation",
            "type": "string",
            "attrs": {
              "fieldType": "radio",
              "values": [
                "Stable",
                "Psychotic Symptom or Dementia",
                "Severely Depressed",
                "Moderately Depressed",
                "Mildly Depressed",
                "Undetectable",
                "Other"
              ]
            }
          },
          "nutrition": {
            "title": "Nutritional Evaluation",
            "type": "object",
            "properties": {
              "higth": {
                "title": "Height(cm)",
                "type": "number",
                "attrs": {
                  "inputGroup": true,
                  "bsColSize": 4
                }
              },
              "weight": {
                "title": "Weight(kg)",
                "type": "number",
                "attrs": {
                  "inputGroup": true,
                  "bsColSize": 4
                }
              },
              "bmi": {
                "title": "Body Mass Index(BMI)",
                "type": "number",
                "attrs": {
                  "inputGroup": true,
                  "bsColSize": 4
                }
              },
              "must": {
                "title": "MUST",
                "description": "Malnutrition Universal Screening Tool",
                "type": "object",
                "attrs": {
                  "styleClass": ["subsection-title"]
                },
                "properties": {
                  "bmi": {
                    "title": "BMI",
                    "type": "number",
                    "attrs": {
                      "inputGroup": true,
                      "bsColSize": 6
                    }
                  },
                  "bmi_score": {
                    "title": "BMI Score",
                    "type": "integer",
                    "attrs": {
                      "inputGroup": true,
                      "bsColSize": 6
                    }
                  },
                  "weight_loss": {
                    "title": "Weight loss",
                    "description": "Unplanned in 3-6 months",
                    "type": "number",
                    "attrs": {
                      "inputGroup": true,
                      "bsColSize": 6
                    }
                  },
                  "weight_loss_score": {
                    "title": "Weight loss score",
                    "type": "integer",
                    "attrs": {
                      "inputGroup": true,
                      "bsColSize": 6
                    }
                  },
                  "acute_effect": {
                    "title": "Acutely illness because of poor intake：",
                    "type": "boolean",
                    "attrs": {
                      "inputGroup": true,
                      "bsColSize": 6
                    }
                  },
                  "acute_effect_score": {
                    "title": "Acute disease effect score",
                    "type": "integer",
                    "attrs": {
                      "inputGroup": true,
                      "bsColSize": 6
                    }
                  },
                  "score": {
                    "title": "Total score",
                    "type": "integer",
                    "attrs": {
                      "inputGroup": true,
                      "bsColSize": 6
                    }
                  }
                }
              }
            }
          },
          "functional_assess": {
            "title": "Functional Assessment",
            "description": "Katz Index of Independence in Activities of Daily Living",
            "type": "object",
            "attrs": {
              "fieldType": "funcassess"
            },
            "properties": {
              "bath": {
                "title": "BATHING",
                "type": "integer"
              },
              "dress": {
                "title": "DRESSING",
                "type": "integer"
              },
              "toilet": {
                "title": "TOILETING",
                "type": "integer"
              },
              "transfer": {
                "title": "TRANSFERRING",
                "type": "integer"
              },
              "continence": {
                "title": "CONTINENCE",
                "type": "integer"
              },
              "feed": {
                "title": "FEEDING",
                "type": "integer"
              },
              "score": {
                "title": "Total",
                "type": "integer"
              }
            }
          },
          "pe": {
            "title": "Physical Examination",
            "type": "object",
            "properties": {
              "looking": {
                "title": "General looking",
                "type": "string",
                "attrs": {
                  "inputGroup": true,
                  "bsColSize": 12
                }
              },
              "vitals": {
                "title": "Vital signs",
                "type": "object",
                "attrs": {
                  "styleClass": ["subsection-title"]
                },
                "properties": {
                  "bt": {
                    "title": "BT(℃)",
                    "type": "number",
                    "attrs": {
                      "inputGroup": true,
                      "bsColSize": 3
                    }
                  },
                  "sbp": {
                    "title": "SBP(mmHg)",
                    "type": "integer",
                    "attrs": {
                      "inputGroup": true,
                      "bsColSize": 3
                    }
                  },
                  "dbp": {
                    "title": "DBP(mmHg)",
                    "type": "integer",
                    "attrs": {
                      "inputGroup": true,
                      "bsColSize": 3
                    }
                  },
                  "pr": {
                    "title": "PR(/min)",
                    "type": "integer",
                    "attrs": {
                      "inputGroup": true,
                      "bsColSize": 3
                    }
                  },
                  "rr": {
                    "title": "RR(/min)",
                    "type": "integer",
                    "attrs": {
                      "inputGroup": true,
                      "bsColSize": 3
                    }
                  },
                  "pain": {
                    "title": "Pain score",
                    "type": "integer",
                    "attrs": {
                      "inputGroup": true,
                      "bsColSize": 3
                    }
                  }
                }
              },
  
              "conscious": {
                "title": "Consciousness",
                "type": "string",
                "attrs": {
                  "inputGroup": true,
                  "bsColSize": 12
                }
              },
              "GCS": {
                "title": "Glasgow Coma Scale",
                "type": "object",
                "attrs": {
                  "styleClass": ["subsection-title"]
                },
                "properties": {
                  "e": {
                    "title": "E",
                    "type": "integer",
                    "attrs": {
                      "inputGroup": true,
                      "bsColSize": 3
                    }
                  },
                  "v": {
                    "title": "V",
                    "type": "integer",
                    "attrs": {
                      "inputGroup": true,
                      "bsColSize": 3
                    }
                  },
                  "m": {
                    "title": "M",
                    "type": "integer",
                    "attrs": {
                      "inputGroup": true,
                      "bsColSize": 3
                    }
                  },
                  "score": {
                    "title": "Score",
                    "type": "integer",
                    "attrs": {
                      "inputGroup": true,
                      "bsColSize": 3
                    }
                  }
                }
              },
              "skin": {
                "title": "Skin",
                "type": "object",
                "attrs": {
                  "styleClass": ["subsection-title"]
                },
                "properties": {
                  "intact": {
                    "title": "Intact：",
                    "type": "boolean"
                  },
                  "turgor": {
                    "title": "Turgor：",
                    "type": "boolean"
                  },
                  "cynosis": {
                    "title": "Cyanosis：",
                    "type": "boolean"
                  },
                  "jaundice": {
                    "title": "Jaundice：",
                    "type": "boolean"
                  },
                  "petechia": {
                    "title": "Petechia：",
                    "type": "boolean"
                  }
                }
              },
              "heent": {
                "title": "HEENT",
                "type": "object",
                "attrs": {
                  "styleClass": ["subsection-title"]
                },
                "properties": {
                  "conjuntivae": {
                    "title": "Conjunctivae",
                    "type": "string",
                    "attrs": {
                      "inputGroup": true,
                      "bsColSize": 12
                    }
                  },
                  "sclera": {
                    "title": "Sclera",
                    "type": "string",
                    "attrs": {
                      "inputGroup": true,
                      "bsColSize": 12
                    }
                  },
                  "throat": {
                    "title": "Throat",
                    "type": "string",
                    "attrs": {
                      "inputGroup": true,
                      "bsColSize": 12
                    }
                  }
                }
              }
            }
          },
          "lab": {
            "title": "Lab finding",
            "type": "object",
            "properties": {
              "data": {
                "title": "Blood",
                "type": "object",
                "attrs": {
                  "styleClass": ["subsection-title"]
                },
                "properties": {
                  "blood": {
                    "title": "Blood",
                    "type": "number",
                    "attrs": {
                      "fieldType": "labtable"
                    }
                  }
                }
              },
              "note": {
                "title": "Note",
                "type": "string",
                "attrs": {
                  "inputGroup": true,
                  "bsColSize": 12
                }
              }
            }
          },
          "image": {
            "title": "Image finding",
            "type": "string",
            "attrs": {
              "inputGroup": true,
              "bsColSize": 12
            }
          },
          "ecg": {
            "title": "ECG finding",
            "type": "string",
            "attrs": {
              "inputGroup": true,
              "bsColSize": 12
            }
          },
          "impression": {
            "title": "Impressions",
            "type": "string",
            "attrs": {
              "inputGroup": true,
              "bsColSize": 12
            }
          },
          "plan": {
            "title": "Plan (Management)",
            "type": "string",
            "attrs": {
              "inputGroup": true,
              "bsColSize": 12
            }
          }
        }
      }
    },
    "example": "{\n    \"id\": \"0001\",\n    \"type\": \"admission\",\n    \"sch_ver\": 1,\n    \"rev\": 3,\n    \"mod_time\": \"2018-10-22T11:10:20Z\",\n    \"created_time\": \"2018-10-21T13:12:10Z\",\n    \"fee_no\": \"I12254551\",\n    \"chr_no\": \"\",\n    \"content\": {\n        \"profile\": {\n            \"name\": \"tester\",\n            \"age\": 30,\n            \"birthdate\": \"1988-01-02\",\n            \"chr_no\": \"00000000\",\n            \"id_no\": \"A120122125\",\n            \"sex\": \"female\"\n        },\n        \"admit_time\": \"2018-10-21T10:12:50Z\",\n        \"evaluate_time\": \"2018-10-21T16:15:44.826Z\",\n        \"source\": \"ER\",\n        \"cc\": \"Abdominal pain for one month\",\n        \"pi\": \"This 50 y/o female with history of uterine myoma s/p myomecatomy. According to the patient, left breast tumor was found for one week. No family Hx. of breast    ca. Menarche 13 G1P1 ,1st delivery at age 35. no HRT. She visited to our GS OPD for help on 2017/06/12. PE.： Lt 1/3 an ill defined tumor 2.4 cm, cT2N0M0 stage  IIA. sono： Lt 1'/5 irregular 2.9 cm. MMG： LUOQ asymmetry. Core needle biopsy was arranged on 2017/6/16： invasive ductal carcinoma, ER(+), PR(-), HER2：  Positive (Score 3+), Ki-67： 50%. We check HbsAg(-), HbsAb(+), anti-HCV(-),CEA 1.81, ca153： 8.8, Cr. 0.52, GOT/GPT 14/7, WBC 8310, seg 76%,Hb 11.0. Dr. suggest neoadjuvant chemotherapy because tumor too close to nipple. Tumor Board： EC-->TH(4x4) p't agree H自費.She received 4course EC and first Taxotere and 4course Herceptin. The breast sono： Lt 1'/3 ca. 1.2 x 0.8 cm--> suggest surgery, so she received Left partial mastectomy+SLNB on 106/10/16. The pathyology showed ypStage IA; ypT1bN0(sn). This time, she was admission for 16th Herceptin(自費).\",\n        \"travel_contact\": \"\",\n        \"personal_hx\": {\n            \"cigarette\": {\n                \"used\": true,\n                \"type\": [\n                    \"cigarettes\"\n                ],\n                \"quited\": false,\n                \"pack_per_day\": 1,\n                \"duration\": 10,\n                \"passive_expose\": false\n            },\n            \"alcohol\": {\n                \"used\": true,\n                \"quited\": false,\n                \"vol_per_day\": 200,\n                \"duration\": 5\n            },\n            \"betel_nut\": {\n                \"used\": false\n            }\n        },\n        \"allergy\": {\n            \"list\": [\n                {\n                    \"generic\": \"Diclofenac\",\n                    \"product\": \"Voren\",\n                    \"ADR\": \"skin rash\"\n                }\n            ],\n            \"note\": \"\"\n        },\n        \"family_hx\": {},\n        \"past_hx\": {\n            \"note\": \"\"\n        },\n        \"review_of_sys\": {\n            \"general\": [\n                \"fatigue\"\n            ],\n            \"skin\": [\n                \"rash\",\n                \"nodule\"\n            ],\n            \"heent\": [],\n            \"cardio_resp\": [],\n            \"gi\": [],\n            \"gu\": [],\n            \"neuro\": [],\n            \"mus_ske\": []\n        },\n        \"medication_hx\": {\n            \"in_institute\": \"\",\n            \"out_institute\": \"\"\n        },\n        \"socioeco\": {\n            \"living\": \"residual\",\n            \"family\": \"well\",\n            \"caregiver\": \"children\",\n            \"finatial\": \"sufficient\"\n        },\n        \"psyco\": \"stable\",\n        \"nutrition\": {\n            \"higth\": 165,\n            \"weight\": 65,\n            \"bmi\": 23.8,\n            \"MUST\": {\n                \"bmi\": 23.8,\n                \"bmi_score\": 0,\n                \"weight_loss\": 5,\n                \"weight_loss_score\": 0,\n                \"acute_effect\": true,\n                \"acute_effect_score\": 2,\n                \"score\": 2\n            }\n        },\n        \"functional_assess\": {\n            \"bath\": 0,\n            \"dress\": 0,\n            \"toilet\": 1,\n            \"transfer\": 0,\n            \"continence\": 1,\n            \"feed\": 0,\n            \"score\": 2\n        },\n        \"pe\": {\n            \"looking\": \"acute_ill\",\n            \"vitals\": {\n                \"bt\": 37.5,\n                \"sbp\": 140,\n                \"dbp\": 90,\n                \"pr\": 85,\n                \"rr\": 20,\n                \"pain\": 3\n            }\n        },\n        \"conscious\": \"awake\",\n        \"GCS\": {\n            \"e\": 4,\n            \"v\": 5,\n            \"m\": 6,\n            \"score\": 15\n        },\n        \"skin\": {\n            \"intact\": true,\n            \"turgor\": false,\n            \"cynosis\": false,\n            \"jaundice\": false,\n            \"petechia\": false\n        },\n        \"heent\": {\n            \"conjuntivae\": \"pale\",\n            \"sclera\": \"icteric\",\n            \"throat\": \"normal\"\n        },\n        \"lab\": {\n            \"data\": {\n                \"blood\": [\n                    {\n                        \"id\": \"CREB\",\n                        \"item\": \"CREA\",\n                        \"date\": \"2018-10-12\",\n                        \"value\": \"0.83\",\n                        \"mark\": \"\"\n                    },\n                    {\n                        \"id\": \"EGFR\",\n                        \"item\": \"eGFR\",\n                        \"date\": \"2018-10-12\",\n                        \"value\": \"124\",\n                        \"mark\": \"\"\n                    },\n                    {\n                        \"id\": \"NA\",\n                        \"item\": \"Na\",\n                        \"date\": \"2018-10-12\",\n                        \"value\": \"133\",\n                        \"mark\": \"L\"\n                    },\n                    {\n                        \"id\": \"K\",\n                        \"item\": \"K\",\n                        \"date\": \"2018-10-12\",\n                        \"value\": \"3.7\",\n                        \"mark\": \"\"\n                    },\n                    {\n                        \"id\": \"ALT\",\n                        \"item\": \"GPT(ALT)\",\n                        \"date\": \"2018-10-12\",\n                        \"value\": \"10\",\n                        \"mark\": \"\"\n                    },\n                    {\n                        \"id\": \"HCT\",\n                        \"item\": \"HCT\",\n                        \"date\": \"2018-10-12\",\n                        \"value\": \"45.6\",\n                        \"mark\": \"\"\n                    },\n                    {\n                        \"id\": \"HGB\",\n                        \"item\": \"HGB\",\n                        \"date\": \"2018-10-12\",\n                        \"value\": \"15.4\",\n                        \"mark\": \"\"\n                    },\n                    {\n                        \"id\": \"MCH\",\n                        \"item\": \"MCH\",\n                        \"date\": \"2018-10-12\",\n                        \"value\": \"30.3\",\n                        \"mark\": \"\"\n                    },\n                    {\n                        \"id\": \"MCHC\",\n                        \"item\": \"MCHC\",\n                        \"date\": \"2018-10-12\",\n                        \"value\": \"33.8\",\n                        \"mark\": \"\"\n                    },\n                    {\n                        \"id\": \"MCV\",\n                        \"item\": \"MCV\",\n                        \"date\": \"2018-10-12\",\n                        \"value\": \"89.8\",\n                        \"mark\": \"\"\n                    },\n                    {\n                        \"id\": \"PDW\",\n                        \"item\": \"PDW\",\n                        \"date\": \"2018-10-12\",\n                        \"value\": \"16.68\",\n                        \"mark\": \"\"\n                    },\n                    {\n                        \"id\": \"PLT\",\n                        \"item\": \"Platelet\",\n                        \"date\": \"2018-10-12\",\n                        \"value\": \"197\",\n                        \"mark\": \"\"\n                    },\n                    {\n                        \"id\": \"R-CV\",\n                        \"item\": \"RDW-CV\",\n                        \"date\": \"2018-10-12\",\n                        \"value\": \"13.0\",\n                        \"mark\": \"\"\n                    },\n                    {\n                        \"id\": \"RBC\",\n                        \"item\": \"RBC\",\n                        \"date\": \"2018-10-12\",\n                        \"value\": \"5.08\",\n                        \"mark\": \"\"\n                    },\n                    {\n                        \"id\": \"WBC\",\n                        \"item\": \"WBC\",\n                        \"date\": \"2018-10-12\",\n                        \"value\": \"14.56\",\n                        \"mark\": \"H\"\n                    },\n                    {\n                        \"id\": \"BASO\",\n                        \"item\": \"Basophil\",\n                        \"date\": \"2018-10-12\",\n                        \"value\": \"0.20\",\n                        \"mark\": \"\"\n                    },\n                    {\n                        \"id\": \"EOS\",\n                        \"item\": \"Eosinophil\",\n                        \"date\": \"2018-10-12\",\n                        \"value\": \"0.10\",\n                        \"mark\": \"\"\n                    },\n                    {\n                        \"id\": \"LYMP\",\n                        \"item\": \"Lymphocyte\",\n                        \"date\": \"2018-10-12\",\n                        \"value\": \"9.50\",\n                        \"mark\": \"L\"\n                    },\n                    {\n                        \"id\": \"MONO\",\n                        \"item\": \"Monocyte\",\n                        \"date\": \"2018-10-12\",\n                        \"value\": \"4.80\",\n                        \"mark\": \"\"\n                    },\n                    {\n                        \"id\": \"NEUT\",\n                        \"item\": \"Neutrophil(seg)\",\n                        \"date\": \"2018-10-12\",\n                        \"value\": \"85.40\",\n                        \"mark\": \"H\"\n                    },\n                    {\n                        \"id\": \"NRBC\",\n                        \"item\": \"NRBC/100WBC\",\n                        \"date\": \"2018-10-12\",\n                        \"value\": \"0.00\",\n                        \"mark\": \"\"\n                    },\n                    {\n                        \"id\": \"INR\",\n                        \"item\": \"INR\",\n                        \"date\": \"2018-10-12\",\n                        \"value\": \"1.080\",\n                        \"mark\": \"\"\n                    },\n                    {\n                        \"id\": \"PT\",\n                        \"item\": \"PT\",\n                        \"date\": \"2018-10-12\",\n                        \"value\": \"13.6\",\n                        \"mark\": \"\"\n                    },\n                    {\n                        \"id\": \"PT-C\",\n                        \"item\": \"Mean Normal Prothrombin Time\",\n                        \"date\": \"2018-10-12\",\n                        \"value\": \"12.8\",\n                        \"mark\": \"\"\n                    },\n                    {\n                        \"id\": \"APTT\",\n                        \"item\": \"aPTT\",\n                        \"date\": \"2018-10-12\",\n                        \"value\": \"33.5\",\n                        \"mark\": \"\"\n                    },\n                    {\n                        \"id\": \"PTT-C\",\n                        \"item\": \"Mean Normal aPTT\",\n                        \"date\": \"2018-10-12\",\n                        \"value\": \"38.5\",\n                        \"mark\": \"\"\n                    },\n                    {\n                        \"id\": \"GLUR\",\n                        \"item\": \"Glu(random)\",\n                        \"date\": \"2018-10-12\",\n                        \"value\": \"99\",\n                        \"mark\": \"\"\n                    }\n                ]\n            },\n            \"note\": \"\"\n        },\n        \"image\": [\n            {\n                \"date\": \"2018-10-12\",\n                \"content\": \"Chest X ray .....\"\n            }\n        ],\n        \"ecg\": \"Normal sinus rhythm\",\n        \"exam\": [\n            {\n                \"date\": \"2018-10-12\",\n                \"content\": \"Abdominen Sonography .....\"\n            }\n        ],\n        \"impression\": \"\",\n        \"plan\": \"\"\n    }\n}"
  }
  

const prepareData = function(data) {
    data.name = "John"
}

const load = function() {
    let data = { name: "David", age: 20 }

    prepareData(data)

    newData = data
    console.log(newData)
}

load()

var someData = null
const assignNull = function(nullData) {
    let x
    if (x = nullData) {
        console.log("xxxx")
    } else {
        console.log("~~~~~~~~")
    }
}

assignNull()


