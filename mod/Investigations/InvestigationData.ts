export type EnemyData = {
    "_RouteNo": number,
    "_PartsTbl": number,
    "_InitSetName": string
    "_SubType": number,
    "_VitalTbl": number,
    "_AttackTbl": number,
    "_OtherTbl": number,
    "_StaminaTbl": number,
    "_Scale": number,
    "_ScaleTbl": number,
    "_Difficulty": number,
    "_BossMulti": number,
    "_IndividualType": number,
    "__QuestName": string
}
export interface MonsterData {
    Id: number,
    Name: string,
    MapIds: number[],
    QuestType: number[],
    OrderType: number,
    QuestLevel: number,
    TargetTypes: number[],
    EnemyDataList: {
        "0": EnemyData[],
        "1": EnemyData[],
    }
    Icon: number
}


interface InvestigationData {
    Monsters: {
        [id: string]: MonsterData
    }

    Maps: {
        [id: string]: {
            EmsSetNo: number[]
        }
    }
}


export let Data: InvestigationData = {
    "Monsters": {
        "0": {
            "Id": 0,
            "Name": "None",
            "MapIds": [],
            "QuestType": [],
            "TargetTypes": [],
            "OrderType": 99,
            "QuestLevel": 10,
            "EnemyDataList": {
                "0": [],
                "1": []
            },
            "Icon": 999
        },
        "1": {
            "Id": 1,
            "Name": "Rathian",
            "MapIds": [
                3,
                2,
                5,
                1,
                12
            ],
            "QuestType": [
                1,
                2
            ],
            "TargetTypes": [
                2,
                3
            ],
            "OrderType": 16,
            "QuestLevel": 1,
            "EnemyDataList": {
                "0": [
                    {
                        "_RouteNo": 10,
                        "_PartsTbl": 128,
                        "_InitSetName": "\u30e1\u30a4\u30f3",
                        "_SubType": 0,
                        "_VitalTbl": 115,
                        "_AttackTbl": 110,
                        "_OtherTbl": 131,
                        "_StaminaTbl": 3,
                        "_Scale": 100,
                        "_ScaleTbl": 6,
                        "_Difficulty": 2,
                        "_BossMulti": 16,
                        "_IndividualType": 0,
                        "__QuestName": "The Queen's Garden"
                    },
                    {
                        "_RouteNo": 10,
                        "_PartsTbl": 128,
                        "_InitSetName": "\u30e1\u30a4\u30f3",
                        "_SubType": 0,
                        "_VitalTbl": 115,
                        "_AttackTbl": 110,
                        "_OtherTbl": 131,
                        "_StaminaTbl": 3,
                        "_Scale": 100,
                        "_ScaleTbl": 6,
                        "_Difficulty": 2,
                        "_BossMulti": 16,
                        "_IndividualType": 0,
                        "__QuestName": "Operation Rathian"
                    },
                    {
                        "_RouteNo": 10,
                        "_PartsTbl": 128,
                        "_InitSetName": "\u30e1\u30a4\u30f3",
                        "_SubType": 0,
                        "_VitalTbl": 115,
                        "_AttackTbl": 110,
                        "_OtherTbl": 131,
                        "_StaminaTbl": 3,
                        "_Scale": 100,
                        "_ScaleTbl": 6,
                        "_Difficulty": 2,
                        "_BossMulti": 16,
                        "_IndividualType": 0,
                        "__QuestName": "An Audience With the Queen"
                    }
                ],
                "1": [
                    {
                        "_RouteNo": 10,
                        "_PartsTbl": 183,
                        "_InitSetName": "\u30e1\u30a4\u30f3",
                        "_SubType": 0,
                        "_VitalTbl": 152,
                        "_AttackTbl": 126,
                        "_OtherTbl": 153,
                        "_StaminaTbl": 3,
                        "_Scale": 100,
                        "_ScaleTbl": 6,
                        "_Difficulty": 1,
                        "_BossMulti": 18,
                        "_IndividualType": 1,
                        "__QuestName": "Anomaly Research: Rathian"
                    }
                ]
            },
            "Icon": 0
        },
        "2": {
            "Id": 2,
            "Name": "Rathalos",
            "MapIds": [
                1,
                5,
                13
            ],
            "QuestType": [
                1
            ],
            "TargetTypes": [
                2
            ],
            "OrderType": 16,
            "QuestLevel": 3,
            "EnemyDataList": {
                "0": [
                    {
                        "_RouteNo": 10,
                        "_PartsTbl": 137,
                        "_InitSetName": "\u30e1\u30a4\u30f3",
                        "_SubType": 0,
                        "_VitalTbl": 123,
                        "_AttackTbl": 116,
                        "_OtherTbl": 135,
                        "_StaminaTbl": 3,
                        "_Scale": 100,
                        "_ScaleTbl": 6,
                        "_Difficulty": 2,
                        "_BossMulti": 16,
                        "_IndividualType": 0,
                        "__QuestName": "King of the Crumbling Castle"
                    },
                    {
                        "_RouteNo": 10,
                        "_PartsTbl": 137,
                        "_InitSetName": "\u30e1\u30a4\u30f3",
                        "_SubType": 0,
                        "_VitalTbl": 123,
                        "_AttackTbl": 116,
                        "_OtherTbl": 135,
                        "_StaminaTbl": 3,
                        "_Scale": 100,
                        "_ScaleTbl": 6,
                        "_Difficulty": 2,
                        "_BossMulti": 16,
                        "_IndividualType": 0,
                        "__QuestName": "Operation Rathalos"
                    },
                    {
                        "_RouteNo": 10,
                        "_PartsTbl": 137,
                        "_InitSetName": "\u30e1\u30a4\u30f3",
                        "_SubType": 0,
                        "_VitalTbl": 123,
                        "_AttackTbl": 116,
                        "_OtherTbl": 135,
                        "_StaminaTbl": 3,
                        "_Scale": 100,
                        "_ScaleTbl": 6,
                        "_Difficulty": 2,
                        "_BossMulti": 16,
                        "_IndividualType": 0,
                        "__QuestName": "Not Your Average Picnic"
                    }
                ],
                "1": []
            },
            "Icon": 1
        },
        "3": {
            "Id": 3,
            "Name": "Khezu",
            "MapIds": [
                4,
                5
            ],
            "QuestType": [
                1,
                2
            ],
            "TargetTypes": [
                2,
                3
            ],
            "OrderType": 16,
            "QuestLevel": 1,
            "EnemyDataList": {
                "0": [
                    {
                        "_RouteNo": 10,
                        "_PartsTbl": 128,
                        "_InitSetName": "\u30e1\u30a4\u30f3",
                        "_SubType": 0,
                        "_VitalTbl": 115,
                        "_AttackTbl": 110,
                        "_OtherTbl": 131,
                        "_StaminaTbl": 3,
                        "_Scale": 100,
                        "_ScaleTbl": 17,
                        "_Difficulty": 2,
                        "_BossMulti": 16,
                        "_IndividualType": 0,
                        "__QuestName": "The Alabaster Devourer"
                    },
                    {
                        "_RouteNo": 10,
                        "_PartsTbl": 128,
                        "_InitSetName": "\u30e1\u30a4\u30f3",
                        "_SubType": 0,
                        "_VitalTbl": 94,
                        "_AttackTbl": 111,
                        "_OtherTbl": 131,
                        "_StaminaTbl": 3,
                        "_Scale": 123,
                        "_ScaleTbl": 0,
                        "_Difficulty": 0,
                        "_BossMulti": 16,
                        "_IndividualType": 0,
                        "__QuestName": "In Pursuit of the Khezuit"
                    },
                    {
                        "_RouteNo": 11,
                        "_PartsTbl": 128,
                        "_InitSetName": "2\u982d",
                        "_SubType": 0,
                        "_VitalTbl": 91,
                        "_AttackTbl": 111,
                        "_OtherTbl": 131,
                        "_StaminaTbl": 3,
                        "_Scale": 90,
                        "_ScaleTbl": 0,
                        "_Difficulty": 0,
                        "_BossMulti": 16,
                        "_IndividualType": 0,
                        "__QuestName": "In Pursuit of the Khezuit"
                    },
                    {
                        "_RouteNo": 10,
                        "_PartsTbl": 128,
                        "_InitSetName": "\u30e1\u30a4\u30f3",
                        "_SubType": 0,
                        "_VitalTbl": 115,
                        "_AttackTbl": 110,
                        "_OtherTbl": 131,
                        "_StaminaTbl": 3,
                        "_Scale": 100,
                        "_ScaleTbl": 17,
                        "_Difficulty": 2,
                        "_BossMulti": 16,
                        "_IndividualType": 0,
                        "__QuestName": "Operation Khezu"
                    }
                ],
                "1": [
                    {
                        "_RouteNo": 10,
                        "_PartsTbl": 182,
                        "_InitSetName": "\u30e1\u30a4\u30f3",
                        "_SubType": 0,
                        "_VitalTbl": 144,
                        "_AttackTbl": 124,
                        "_OtherTbl": 153,
                        "_StaminaTbl": 3,
                        "_Scale": 100,
                        "_ScaleTbl": 17,
                        "_Difficulty": 1,
                        "_BossMulti": 16,
                        "_IndividualType": 1,
                        "__QuestName": "Anomaly Research: Khezu"
                    }
                ]
            },
            "Icon": 2
        },
        "4": {
            "Id": 4,
            "Name": "Basarios",
            "MapIds": [
                2,
                5
            ],
            "QuestType": [
                1,
                2
            ],
            "TargetTypes": [
                2,
                3
            ],
            "OrderType": 16,
            "QuestLevel": 1,
            "EnemyDataList": {
                "0": [
                    {
                        "_RouteNo": 10,
                        "_PartsTbl": 128,
                        "_InitSetName": "\u30e1\u30a4\u30f3",
                        "_SubType": 0,
                        "_VitalTbl": 115,
                        "_AttackTbl": 110,
                        "_OtherTbl": 131,
                        "_StaminaTbl": 3,
                        "_Scale": 100,
                        "_ScaleTbl": 6,
                        "_Difficulty": 2,
                        "_BossMulti": 16,
                        "_IndividualType": 0,
                        "__QuestName": "Pent-Up Frustrations"
                    },
                    {
                        "_RouteNo": 10,
                        "_PartsTbl": 133,
                        "_InitSetName": "\u30e1\u30a4\u30f3",
                        "_SubType": 0,
                        "_VitalTbl": 97,
                        "_AttackTbl": 115,
                        "_OtherTbl": 132,
                        "_StaminaTbl": 3,
                        "_Scale": 123,
                        "_ScaleTbl": 0,
                        "_Difficulty": 0,
                        "_BossMulti": 16,
                        "_IndividualType": 0,
                        "__QuestName": "Operation Double Basarios"
                    },
                    {
                        "_RouteNo": 11,
                        "_PartsTbl": 133,
                        "_InitSetName": "2\u982d",
                        "_SubType": 0,
                        "_VitalTbl": 94,
                        "_AttackTbl": 115,
                        "_OtherTbl": 132,
                        "_StaminaTbl": 3,
                        "_Scale": 90,
                        "_ScaleTbl": 0,
                        "_Difficulty": 0,
                        "_BossMulti": 16,
                        "_IndividualType": 0,
                        "__QuestName": "Operation Double Basarios"
                    },
                    {
                        "_RouteNo": 10,
                        "_PartsTbl": 133,
                        "_InitSetName": "\u30e1\u30a4\u30f3",
                        "_SubType": 0,
                        "_VitalTbl": 97,
                        "_AttackTbl": 115,
                        "_OtherTbl": 132,
                        "_StaminaTbl": 3,
                        "_Scale": 123,
                        "_ScaleTbl": 0,
                        "_Difficulty": 0,
                        "_BossMulti": 16,
                        "_IndividualType": 0,
                        "__QuestName": "Basarios Buzzkill"
                    },
                    {
                        "_RouteNo": 11,
                        "_PartsTbl": 133,
                        "_InitSetName": "2\u982d",
                        "_SubType": 0,
                        "_VitalTbl": 94,
                        "_AttackTbl": 115,
                        "_OtherTbl": 132,
                        "_StaminaTbl": 3,
                        "_Scale": 90,
                        "_ScaleTbl": 0,
                        "_Difficulty": 0,
                        "_BossMulti": 16,
                        "_IndividualType": 0,
                        "__QuestName": "Basarios Buzzkill"
                    }
                ],
                "1": [
                    {
                        "_RouteNo": 10,
                        "_PartsTbl": 182,
                        "_InitSetName": "\u30e1\u30a4\u30f3",
                        "_SubType": 0,
                        "_VitalTbl": 141,
                        "_AttackTbl": 124,
                        "_OtherTbl": 153,
                        "_StaminaTbl": 3,
                        "_Scale": 100,
                        "_ScaleTbl": 6,
                        "_Difficulty": 1,
                        "_BossMulti": 16,
                        "_IndividualType": 1,
                        "__QuestName": "Anomaly Research: Basarios"
                    }
                ]
            },
            "Icon": 3
        },
        "7": {
            "Id": 7,
            "Name": "Diablos",
            "MapIds": [
                2
            ],
            "QuestType": [
                1
            ],
            "TargetTypes": [
                2
            ],
            "OrderType": 16,
            "QuestLevel": 3,
            "EnemyDataList": {
                "0": [
                    {
                        "_RouteNo": 10,
                        "_PartsTbl": 137,
                        "_InitSetName": "\u30e1\u30a4\u30f3",
                        "_SubType": 0,
                        "_VitalTbl": 123,
                        "_AttackTbl": 116,
                        "_OtherTbl": 135,
                        "_StaminaTbl": 3,
                        "_Scale": 100,
                        "_ScaleTbl": 6,
                        "_Difficulty": 2,
                        "_BossMulti": 16,
                        "_IndividualType": 0,
                        "__QuestName": "Dust Devil Despot"
                    },
                    {
                        "_RouteNo": 10,
                        "_PartsTbl": 137,
                        "_InitSetName": "\u30e1\u30a4\u30f3",
                        "_SubType": 0,
                        "_VitalTbl": 102,
                        "_AttackTbl": 117,
                        "_OtherTbl": 135,
                        "_StaminaTbl": 3,
                        "_Scale": 123,
                        "_ScaleTbl": 0,
                        "_Difficulty": 0,
                        "_BossMulti": 16,
                        "_IndividualType": 0,
                        "__QuestName": "Monju Mashup!"
                    },
                    {
                        "_RouteNo": 11,
                        "_PartsTbl": 137,
                        "_InitSetName": "2\u982d",
                        "_SubType": 0,
                        "_VitalTbl": 98,
                        "_AttackTbl": 117,
                        "_OtherTbl": 135,
                        "_StaminaTbl": 3,
                        "_Scale": 90,
                        "_ScaleTbl": 0,
                        "_Difficulty": 0,
                        "_BossMulti": 16,
                        "_IndividualType": 0,
                        "__QuestName": "Monju Mashup!"
                    }
                ],
                "1": []
            },
            "Icon": 4
        },
        "19": {
            "Id": 19,
            "Name": "Daimyo Hermitaur",
            "MapIds": [
                1,
                12,
                2,
                3
            ],
            "QuestType": [
                1,
                2
            ],
            "TargetTypes": [
                2,
                3
            ],
            "OrderType": 7,
            "QuestLevel": 0,
            "EnemyDataList": {
                "0": [
                    {
                        "_RouteNo": 10,
                        "_PartsTbl": 110,
                        "_InitSetName": "\u30e1\u30a4\u30f3",
                        "_SubType": 0,
                        "_VitalTbl": 102,
                        "_AttackTbl": 98,
                        "_OtherTbl": 130,
                        "_StaminaTbl": 3,
                        "_Scale": 100,
                        "_ScaleTbl": 6,
                        "_Difficulty": 2,
                        "_BossMulti": 16,
                        "_IndividualType": 0,
                        "__QuestName": "Uninvited Guest"
                    },
                    {
                        "_RouteNo": 10,
                        "_PartsTbl": 120,
                        "_InitSetName": "\u30e1\u30a4\u30f3",
                        "_SubType": 0,
                        "_VitalTbl": 89,
                        "_AttackTbl": 103,
                        "_OtherTbl": 130,
                        "_StaminaTbl": 3,
                        "_Scale": 123,
                        "_ScaleTbl": 0,
                        "_Difficulty": 0,
                        "_BossMulti": 16,
                        "_IndividualType": 0,
                        "__QuestName": "Supply Line Shell Game"
                    },
                    {
                        "_RouteNo": 11,
                        "_PartsTbl": 120,
                        "_InitSetName": "2\u982d",
                        "_SubType": 0,
                        "_VitalTbl": 87,
                        "_AttackTbl": 103,
                        "_OtherTbl": 130,
                        "_StaminaTbl": 3,
                        "_Scale": 90,
                        "_ScaleTbl": 0,
                        "_Difficulty": 0,
                        "_BossMulti": 16,
                        "_IndividualType": 0,
                        "__QuestName": "Supply Line Shell Game"
                    }
                ],
                "1": [
                    {
                        "_RouteNo": 10,
                        "_PartsTbl": 182,
                        "_InitSetName": "\u30e1\u30a4\u30f3",
                        "_SubType": 0,
                        "_VitalTbl": 150,
                        "_AttackTbl": 126,
                        "_OtherTbl": 153,
                        "_StaminaTbl": 3,
                        "_Scale": 100,
                        "_ScaleTbl": 6,
                        "_Difficulty": 1,
                        "_BossMulti": 16,
                        "_IndividualType": 1,
                        "__QuestName": "Anomaly Research: Daimyo Hermitaur"
                    }
                ]
            },
            "Icon": 43
        },
        "20": {
            "Id": 20,
            "Name": "Shogun Ceanataur",
            "MapIds": [
                3,
                5
            ],
            "QuestType": [
                1,
                2
            ],
            "TargetTypes": [
                2,
                3
            ],
            "OrderType": 16,
            "QuestLevel": 2,
            "EnemyDataList": {
                "0": [
                    {
                        "_RouteNo": 10,
                        "_PartsTbl": 133,
                        "_InitSetName": "\u30e1\u30a4\u30f3",
                        "_SubType": 0,
                        "_VitalTbl": 119,
                        "_AttackTbl": 112,
                        "_OtherTbl": 132,
                        "_StaminaTbl": 3,
                        "_Scale": 100,
                        "_ScaleTbl": 6,
                        "_Difficulty": 2,
                        "_BossMulti": 16,
                        "_IndividualType": 0,
                        "__QuestName": "My Ceanataur Gently Weeps"
                    },
                    {
                        "_RouteNo": 10,
                        "_PartsTbl": 133,
                        "_InitSetName": "\u30e1\u30a4\u30f3",
                        "_SubType": 0,
                        "_VitalTbl": 119,
                        "_AttackTbl": 112,
                        "_OtherTbl": 132,
                        "_StaminaTbl": 3,
                        "_Scale": 100,
                        "_ScaleTbl": 6,
                        "_Difficulty": 2,
                        "_BossMulti": 16,
                        "_IndividualType": 0,
                        "__QuestName": "Operation Shogun Ceanataur"
                    }
                ],
                "1": [
                    {
                        "_RouteNo": 10,
                        "_PartsTbl": 183,
                        "_InitSetName": "\u30e1\u30a4\u30f3",
                        "_SubType": 0,
                        "_VitalTbl": 147,
                        "_AttackTbl": 125,
                        "_OtherTbl": 153,
                        "_StaminaTbl": 3,
                        "_Scale": 100,
                        "_ScaleTbl": 6,
                        "_Difficulty": 1,
                        "_BossMulti": 18,
                        "_IndividualType": 1,
                        "__QuestName": "Anomaly Research: Shogun Ceanataur"
                    }
                ]
            },
            "Icon": 44
        },
        "23": {
            "Id": 23,
            "Name": "Rajang",
            "MapIds": [
                3,
                2,
                1,
                5,
                4,
                12,
                13
            ],
            "QuestType": [
                1
            ],
            "TargetTypes": [
                2
            ],
            "OrderType": 16,
            "QuestLevel": 4,
            "EnemyDataList": {
                "0": [
                    {
                        "_RouteNo": 10,
                        "_PartsTbl": 141,
                        "_InitSetName": "\u30e1\u30a4\u30f3",
                        "_SubType": 0,
                        "_VitalTbl": 129,
                        "_AttackTbl": 122,
                        "_OtherTbl": 136,
                        "_StaminaTbl": 3,
                        "_Scale": 100,
                        "_ScaleTbl": 11,
                        "_Difficulty": 2,
                        "_BossMulti": 16,
                        "_IndividualType": 0,
                        "__QuestName": "Settle the Score!"
                    },
                    {
                        "_RouteNo": 10,
                        "_PartsTbl": 149,
                        "_InitSetName": "\u30e1\u30a4\u30f3",
                        "_SubType": 0,
                        "_VitalTbl": 118,
                        "_AttackTbl": 124,
                        "_OtherTbl": 137,
                        "_StaminaTbl": 3,
                        "_Scale": 123,
                        "_ScaleTbl": 0,
                        "_Difficulty": 0,
                        "_BossMulti": 16,
                        "_IndividualType": 0,
                        "__QuestName": "The Ultimate Fight?"
                    },
                    {
                        "_RouteNo": 11,
                        "_PartsTbl": 149,
                        "_InitSetName": "2\u982d",
                        "_SubType": 0,
                        "_VitalTbl": 116,
                        "_AttackTbl": 124,
                        "_OtherTbl": 137,
                        "_StaminaTbl": 3,
                        "_Scale": 97,
                        "_ScaleTbl": 0,
                        "_Difficulty": 0,
                        "_BossMulti": 16,
                        "_IndividualType": 0,
                        "__QuestName": "The Ultimate Fight?"
                    },
                    {
                        "_RouteNo": 10,
                        "_PartsTbl": 141,
                        "_InitSetName": "\u30e1\u30a4\u30f3",
                        "_SubType": 0,
                        "_VitalTbl": 129,
                        "_AttackTbl": 122,
                        "_OtherTbl": 136,
                        "_StaminaTbl": 3,
                        "_Scale": 100,
                        "_ScaleTbl": 11,
                        "_Difficulty": 2,
                        "_BossMulti": 16,
                        "_IndividualType": 0,
                        "__QuestName": "Operation Rajang"
                    },
                    {
                        "_RouteNo": 10,
                        "_PartsTbl": 141,
                        "_InitSetName": "\u30e1\u30a4\u30f3",
                        "_SubType": 0,
                        "_VitalTbl": 129,
                        "_AttackTbl": 122,
                        "_OtherTbl": 136,
                        "_StaminaTbl": 3,
                        "_Scale": 100,
                        "_ScaleTbl": 11,
                        "_Difficulty": 2,
                        "_BossMulti": 16,
                        "_IndividualType": 0,
                        "__QuestName": "Grabbin' Life by the Horns"
                    }
                ],
                "1": []
            },
            "Icon": 5
        },
        "24": {
            "Id": 24,
            "Name": "Kushala Daora",
            "MapIds": [
                4,
                2,
                13,
                12
            ],
            "QuestType": [
                2
            ],
            "TargetTypes": [
                3
            ],
            "OrderType": 16,
            "QuestLevel": 4,
            "EnemyDataList": {
                "0": [
                    {
                        "_RouteNo": 10,
                        "_PartsTbl": 141,
                        "_InitSetName": "\u30e1\u30a4\u30f3",
                        "_SubType": 0,
                        "_VitalTbl": 129,
                        "_AttackTbl": 122,
                        "_OtherTbl": 136,
                        "_StaminaTbl": 3,
                        "_Scale": 100,
                        "_ScaleTbl": 11,
                        "_Difficulty": 2,
                        "_BossMulti": 16,
                        "_IndividualType": 0,
                        "__QuestName": "Storm of The Kushala Daora"
                    },
                    {
                        "_RouteNo": 10,
                        "_PartsTbl": 141,
                        "_InitSetName": "\u30e1\u30a4\u30f3",
                        "_SubType": 0,
                        "_VitalTbl": 129,
                        "_AttackTbl": 122,
                        "_OtherTbl": 136,
                        "_StaminaTbl": 3,
                        "_Scale": 100,
                        "_ScaleTbl": 11,
                        "_Difficulty": 2,
                        "_BossMulti": 16,
                        "_IndividualType": 0,
                        "__QuestName": "The Frozen Dictator"
                    },
                    {
                        "_RouteNo": 10,
                        "_PartsTbl": 141,
                        "_InitSetName": "\u30e1\u30a4\u30f3",
                        "_SubType": 0,
                        "_VitalTbl": 129,
                        "_AttackTbl": 122,
                        "_OtherTbl": 136,
                        "_StaminaTbl": 3,
                        "_Scale": 100,
                        "_ScaleTbl": 11,
                        "_Difficulty": 2,
                        "_BossMulti": 16,
                        "_IndividualType": 0,
                        "__QuestName": "Operation Kushala Daora"
                    },
                    {
                        "_RouteNo": 10,
                        "_PartsTbl": 141,
                        "_InitSetName": "\u30e1\u30a4\u30f3",
                        "_SubType": 0,
                        "_VitalTbl": 129,
                        "_AttackTbl": 122,
                        "_OtherTbl": 136,
                        "_StaminaTbl": 3,
                        "_Scale": 100,
                        "_ScaleTbl": 11,
                        "_Difficulty": 2,
                        "_BossMulti": 16,
                        "_IndividualType": 0,
                        "__QuestName": "A Cold Wind Blows"
                    }
                ],
                "1": []
            },
            "Icon": 6
        },
        "25": {
            "Id": 25,
            "Name": "Chameleos",
            "MapIds": [
                1,
                3,
                12,
                13
            ],
            "QuestType": [
                2
            ],
            "TargetTypes": [
                3
            ],
            "OrderType": 16,
            "QuestLevel": 4,
            "EnemyDataList": {
                "0": [
                    {
                        "_RouteNo": 10,
                        "_PartsTbl": 141,
                        "_InitSetName": "\u30e1\u30a4\u30f3",
                        "_SubType": 0,
                        "_VitalTbl": 129,
                        "_AttackTbl": 122,
                        "_OtherTbl": 136,
                        "_StaminaTbl": 3,
                        "_Scale": 100,
                        "_ScaleTbl": 11,
                        "_Difficulty": 2,
                        "_BossMulti": 16,
                        "_IndividualType": 0,
                        "__QuestName": "Beyond the Silence"
                    },
                    {
                        "_RouteNo": 10,
                        "_PartsTbl": 141,
                        "_InitSetName": "\u30e1\u30a4\u30f3",
                        "_SubType": 0,
                        "_VitalTbl": 129,
                        "_AttackTbl": 122,
                        "_OtherTbl": 136,
                        "_StaminaTbl": 3,
                        "_Scale": 100,
                        "_ScaleTbl": 11,
                        "_Difficulty": 2,
                        "_BossMulti": 16,
                        "_IndividualType": 0,
                        "__QuestName": "Leave No Trace Behind"
                    },
                    {
                        "_RouteNo": 10,
                        "_PartsTbl": 149,
                        "_InitSetName": "\u30e1\u30a4\u30f3",
                        "_SubType": 0,
                        "_VitalTbl": 134,
                        "_AttackTbl": 123,
                        "_OtherTbl": 137,
                        "_StaminaTbl": 3,
                        "_Scale": 100,
                        "_ScaleTbl": 11,
                        "_Difficulty": 2,
                        "_BossMulti": 16,
                        "_IndividualType": 0,
                        "__QuestName": "Operation Chameleos"
                    },
                    {
                        "_RouteNo": 10,
                        "_PartsTbl": 149,
                        "_InitSetName": "\u30e1\u30a4\u30f3",
                        "_SubType": 0,
                        "_VitalTbl": 134,
                        "_AttackTbl": 123,
                        "_OtherTbl": 137,
                        "_StaminaTbl": 3,
                        "_Scale": 100,
                        "_ScaleTbl": 11,
                        "_Difficulty": 2,
                        "_BossMulti": 16,
                        "_IndividualType": 0,
                        "__QuestName": "Invisible Threat"
                    }
                ],
                "1": []
            },
            "Icon": 7
        },
        "27": {
            "Id": 27,
            "Name": "Teostra",
            "MapIds": [
                5,
                2,
                13
            ],
            "QuestType": [
                2
            ],
            "TargetTypes": [
                3
            ],
            "OrderType": 16,
            "QuestLevel": 4,
            "EnemyDataList": {
                "0": [
                    {
                        "_RouteNo": 10,
                        "_PartsTbl": 141,
                        "_InitSetName": "\u30e1\u30a4\u30f3",
                        "_SubType": 0,
                        "_VitalTbl": 129,
                        "_AttackTbl": 122,
                        "_OtherTbl": 136,
                        "_StaminaTbl": 3,
                        "_Scale": 100,
                        "_ScaleTbl": 11,
                        "_Difficulty": 2,
                        "_BossMulti": 16,
                        "_IndividualType": 0,
                        "__QuestName": "Emperor of Flame"
                    },
                    {
                        "_RouteNo": 10,
                        "_PartsTbl": 141,
                        "_InitSetName": "\u30e1\u30a4\u30f3",
                        "_SubType": 0,
                        "_VitalTbl": 129,
                        "_AttackTbl": 122,
                        "_OtherTbl": 136,
                        "_StaminaTbl": 3,
                        "_Scale": 100,
                        "_ScaleTbl": 11,
                        "_Difficulty": 2,
                        "_BossMulti": 16,
                        "_IndividualType": 0,
                        "__QuestName": "Burn Brighter Than the Sun"
                    },
                    {
                        "_RouteNo": 10,
                        "_PartsTbl": 141,
                        "_InitSetName": "\u30e1\u30a4\u30f3",
                        "_SubType": 0,
                        "_VitalTbl": 129,
                        "_AttackTbl": 122,
                        "_OtherTbl": 136,
                        "_StaminaTbl": 3,
                        "_Scale": 100,
                        "_ScaleTbl": 11,
                        "_Difficulty": 2,
                        "_BossMulti": 16,
                        "_IndividualType": 0,
                        "__QuestName": "Operation Teostra"
                    },
                    {
                        "_RouteNo": 10,
                        "_PartsTbl": 141,
                        "_InitSetName": "\u30e1\u30a4\u30f3",
                        "_SubType": 0,
                        "_VitalTbl": 129,
                        "_AttackTbl": 122,
                        "_OtherTbl": 136,
                        "_StaminaTbl": 3,
                        "_Scale": 100,
                        "_ScaleTbl": 11,
                        "_Difficulty": 2,
                        "_BossMulti": 16,
                        "_IndividualType": 0,
                        "__QuestName": "The Fire Still Burns"
                    }
                ],
                "1": []
            },
            "Icon": 8
        },
        "32": {
            "Id": 32,
            "Name": "Tigrex",
            "MapIds": [
                4,
                5,
                2,
                13
            ],
            "QuestType": [
                1
            ],
            "TargetTypes": [
                2
            ],
            "OrderType": 16,
            "QuestLevel": 3,
            "EnemyDataList": {
                "0": [
                    {
                        "_RouteNo": 10,
                        "_PartsTbl": 137,
                        "_InitSetName": "\u30e1\u30a4\u30f3",
                        "_SubType": 0,
                        "_VitalTbl": 123,
                        "_AttackTbl": 118,
                        "_OtherTbl": 135,
                        "_StaminaTbl": 3,
                        "_Scale": 100,
                        "_ScaleTbl": 6,
                        "_Difficulty": 2,
                        "_BossMulti": 16,
                        "_IndividualType": 0,
                        "__QuestName": "Absolute Power"
                    },
                    {
                        "_RouteNo": 10,
                        "_PartsTbl": 141,
                        "_InitSetName": "\u30e1\u30a4\u30f3",
                        "_SubType": 0,
                        "_VitalTbl": 109,
                        "_AttackTbl": 123,
                        "_OtherTbl": 136,
                        "_StaminaTbl": 3,
                        "_Scale": 123,
                        "_ScaleTbl": 0,
                        "_Difficulty": 0,
                        "_BossMulti": 16,
                        "_IndividualType": 0,
                        "__QuestName": "Seismic Scares"
                    },
                    {
                        "_RouteNo": 11,
                        "_PartsTbl": 141,
                        "_InitSetName": "2\u982d",
                        "_SubType": 0,
                        "_VitalTbl": 104,
                        "_AttackTbl": 123,
                        "_OtherTbl": 136,
                        "_StaminaTbl": 3,
                        "_Scale": 90,
                        "_ScaleTbl": 0,
                        "_Difficulty": 0,
                        "_BossMulti": 16,
                        "_IndividualType": 0,
                        "__QuestName": "Seismic Scares"
                    },
                    {
                        "_RouteNo": 10,
                        "_PartsTbl": 137,
                        "_InitSetName": "\u30e1\u30a4\u30f3",
                        "_SubType": 0,
                        "_VitalTbl": 123,
                        "_AttackTbl": 118,
                        "_OtherTbl": 135,
                        "_StaminaTbl": 3,
                        "_Scale": 100,
                        "_ScaleTbl": 6,
                        "_Difficulty": 2,
                        "_BossMulti": 16,
                        "_IndividualType": 0,
                        "__QuestName": "Operation Tigrex"
                    },
                    {
                        "_RouteNo": 10,
                        "_PartsTbl": 137,
                        "_InitSetName": "\u30e1\u30a4\u30f3",
                        "_SubType": 0,
                        "_VitalTbl": 123,
                        "_AttackTbl": 118,
                        "_OtherTbl": 135,
                        "_StaminaTbl": 3,
                        "_Scale": 100,
                        "_ScaleTbl": 6,
                        "_Difficulty": 2,
                        "_BossMulti": 16,
                        "_IndividualType": 0,
                        "__QuestName": "Destructive Instructor"
                    }
                ],
                "1": []
            },
            "Icon": 9
        },
        "37": {
            "Id": 37,
            "Name": "Nargacuga",
            "MapIds": [
                1,
                3,
                12
            ],
            "QuestType": [
                1,
                2
            ],
            "TargetTypes": [
                2,
                3
            ],
            "OrderType": 16,
            "QuestLevel": 2,
            "EnemyDataList": {
                "0": [
                    {
                        "_RouteNo": 10,
                        "_PartsTbl": 133,
                        "_InitSetName": "\u30e1\u30a4\u30f3",
                        "_SubType": 0,
                        "_VitalTbl": 119,
                        "_AttackTbl": 114,
                        "_OtherTbl": 132,
                        "_StaminaTbl": 3,
                        "_Scale": 100,
                        "_ScaleTbl": 6,
                        "_Difficulty": 2,
                        "_BossMulti": 16,
                        "_IndividualType": 0,
                        "__QuestName": "Shadow in the Jungle"
                    },
                    {
                        "_RouteNo": 10,
                        "_PartsTbl": 133,
                        "_InitSetName": "\u30e1\u30a4\u30f3",
                        "_SubType": 0,
                        "_VitalTbl": 97,
                        "_AttackTbl": 115,
                        "_OtherTbl": 132,
                        "_StaminaTbl": 3,
                        "_Scale": 123,
                        "_ScaleTbl": 0,
                        "_Difficulty": 0,
                        "_BossMulti": 16,
                        "_IndividualType": 0,
                        "__QuestName": "Shady Activity"
                    },
                    {
                        "_RouteNo": 12,
                        "_PartsTbl": 133,
                        "_InitSetName": "2\u982d",
                        "_SubType": 0,
                        "_VitalTbl": 94,
                        "_AttackTbl": 115,
                        "_OtherTbl": 132,
                        "_StaminaTbl": 3,
                        "_Scale": 90,
                        "_ScaleTbl": 0,
                        "_Difficulty": 0,
                        "_BossMulti": 16,
                        "_IndividualType": 0,
                        "__QuestName": "Shady Activity"
                    },
                    {
                        "_RouteNo": 10,
                        "_PartsTbl": 133,
                        "_InitSetName": "\u30e1\u30a4\u30f3",
                        "_SubType": 0,
                        "_VitalTbl": 119,
                        "_AttackTbl": 114,
                        "_OtherTbl": 132,
                        "_StaminaTbl": 3,
                        "_Scale": 100,
                        "_ScaleTbl": 6,
                        "_Difficulty": 2,
                        "_BossMulti": 16,
                        "_IndividualType": 0,
                        "__QuestName": "Operation Nargacuga"
                    },
                    {
                        "_RouteNo": 10,
                        "_PartsTbl": 133,
                        "_InitSetName": "\u30e1\u30a4\u30f3",
                        "_SubType": 0,
                        "_VitalTbl": 119,
                        "_AttackTbl": 114,
                        "_OtherTbl": 132,
                        "_StaminaTbl": 3,
                        "_Scale": 100,
                        "_ScaleTbl": 6,
                        "_Difficulty": 2,
                        "_BossMulti": 16,
                        "_IndividualType": 0,
                        "__QuestName": "Into the Jungle Deep"
                    }
                ],
                "1": [
                    {
                        "_RouteNo": 10,
                        "_PartsTbl": 184,
                        "_InitSetName": "\u30e1\u30a4\u30f3",
                        "_SubType": 0,
                        "_VitalTbl": 146,
                        "_AttackTbl": 126,
                        "_OtherTbl": 153,
                        "_StaminaTbl": 3,
                        "_Scale": 100,
                        "_ScaleTbl": 6,
                        "_Difficulty": 1,
                        "_BossMulti": 18,
                        "_IndividualType": 1,
                        "__QuestName": "Anomaly Research: Nargacuga"
                    }
                ]
            },
            "Icon": 10
        },
        "42": {
            "Id": 42,
            "Name": "Barioth",
            "MapIds": [
                4,
                13
            ],
            "QuestType": [
                1,
                2
            ],
            "TargetTypes": [
                2,
                3
            ],
            "OrderType": 16,
            "QuestLevel": 2,
            "EnemyDataList": {
                "0": [
                    {
                        "_RouteNo": 10,
                        "_PartsTbl": 133,
                        "_InitSetName": "\u30e1\u30a4\u30f3",
                        "_SubType": 0,
                        "_VitalTbl": 119,
                        "_AttackTbl": 114,
                        "_OtherTbl": 132,
                        "_StaminaTbl": 3,
                        "_Scale": 100,
                        "_ScaleTbl": 6,
                        "_Difficulty": 2,
                        "_BossMulti": 16,
                        "_IndividualType": 0,
                        "__QuestName": "White Knight on Ice"
                    },
                    {
                        "_RouteNo": 10,
                        "_PartsTbl": 133,
                        "_InitSetName": "\u30e1\u30a4\u30f3",
                        "_SubType": 0,
                        "_VitalTbl": 119,
                        "_AttackTbl": 114,
                        "_OtherTbl": 132,
                        "_StaminaTbl": 3,
                        "_Scale": 100,
                        "_ScaleTbl": 6,
                        "_Difficulty": 2,
                        "_BossMulti": 16,
                        "_IndividualType": 0,
                        "__QuestName": "Operation Barioth"
                    },
                    {
                        "_RouteNo": 10,
                        "_PartsTbl": 133,
                        "_InitSetName": "\u30e1\u30a4\u30f3",
                        "_SubType": 0,
                        "_VitalTbl": 119,
                        "_AttackTbl": 114,
                        "_OtherTbl": 132,
                        "_StaminaTbl": 3,
                        "_Scale": 100,
                        "_ScaleTbl": 6,
                        "_Difficulty": 2,
                        "_BossMulti": 16,
                        "_IndividualType": 0,
                        "__QuestName": "White Knight Vs. New Knight"
                    }
                ],
                "1": [
                    {
                        "_RouteNo": 10,
                        "_PartsTbl": 184,
                        "_InitSetName": "\u30e1\u30a4\u30f3",
                        "_SubType": 0,
                        "_VitalTbl": 147,
                        "_AttackTbl": 126,
                        "_OtherTbl": 153,
                        "_StaminaTbl": 3,
                        "_Scale": 100,
                        "_ScaleTbl": 6,
                        "_Difficulty": 1,
                        "_BossMulti": 18,
                        "_IndividualType": 1,
                        "__QuestName": "Anomaly Research: Barioth"
                    }
                ]
            },
            "Icon": 11
        },
        "44": {
            "Id": 44,
            "Name": "Barroth",
            "MapIds": [
                2
            ],
            "QuestType": [
                1,
                2
            ],
            "TargetTypes": [
                2,
                3
            ],
            "OrderType": 16,
            "QuestLevel": 0,
            "EnemyDataList": {
                "0": [
                    {
                        "_RouteNo": 10,
                        "_PartsTbl": 120,
                        "_InitSetName": "\u30e1\u30a4\u30f3",
                        "_SubType": 0,
                        "_VitalTbl": 107,
                        "_AttackTbl": 102,
                        "_OtherTbl": 130,
                        "_StaminaTbl": 3,
                        "_Scale": 100,
                        "_ScaleTbl": 6,
                        "_Difficulty": 2,
                        "_BossMulti": 16,
                        "_IndividualType": 0,
                        "__QuestName": "Barroth to a Great Start"
                    }
                ],
                "1": [
                    {
                        "_RouteNo": 10,
                        "_PartsTbl": 182,
                        "_InitSetName": "\u30e1\u30a4\u30f3",
                        "_SubType": 0,
                        "_VitalTbl": 145,
                        "_AttackTbl": 126,
                        "_OtherTbl": 153,
                        "_StaminaTbl": 3,
                        "_Scale": 100,
                        "_ScaleTbl": 6,
                        "_Difficulty": 1,
                        "_BossMulti": 16,
                        "_IndividualType": 1,
                        "__QuestName": "Anomaly Research: Barroth"
                    }
                ]
            },
            "Icon": 12
        },
        "47": {
            "Id": 47,
            "Name": "Royal Ludroth",
            "MapIds": [
                3,
                5,
                12
            ],
            "QuestType": [
                1,
                2
            ],
            "TargetTypes": [
                2,
                3
            ],
            "OrderType": 16,
            "QuestLevel": 0,
            "EnemyDataList": {
                "0": [
                    {
                        "_RouteNo": 10,
                        "_PartsTbl": 120,
                        "_InitSetName": "\u30e1\u30a4\u30f3",
                        "_SubType": 0,
                        "_VitalTbl": 107,
                        "_AttackTbl": 102,
                        "_OtherTbl": 130,
                        "_StaminaTbl": 3,
                        "_Scale": 100,
                        "_ScaleTbl": 6,
                        "_Difficulty": 2,
                        "_BossMulti": 16,
                        "_IndividualType": 0,
                        "__QuestName": "You Had Me at Poofy"
                    }
                ],
                "1": [
                    {
                        "_RouteNo": 10,
                        "_PartsTbl": 182,
                        "_InitSetName": "\u30e1\u30a4\u30f3",
                        "_SubType": 0,
                        "_VitalTbl": 144,
                        "_AttackTbl": 126,
                        "_OtherTbl": 153,
                        "_StaminaTbl": 3,
                        "_Scale": 100,
                        "_ScaleTbl": 6,
                        "_Difficulty": 1,
                        "_BossMulti": 16,
                        "_IndividualType": 1,
                        "__QuestName": "Anomaly Research: Royal Ludroth"
                    }
                ]
            },
            "Icon": 13
        },
        "54": {
            "Id": 54,
            "Name": "Great Baggi",
            "MapIds": [
                4
            ],
            "QuestType": [
                2
            ],
            "TargetTypes": [
                3
            ],
            "OrderType": 22,
            "QuestLevel": 5,
            "EnemyDataList": {
                "0": [],
                "1": [
                    {
                        "_RouteNo": 10,
                        "_PartsTbl": 181,
                        "_InitSetName": "\u30e1\u30a4\u30f3",
                        "_SubType": 0,
                        "_VitalTbl": 154,
                        "_AttackTbl": 125,
                        "_OtherTbl": 153,
                        "_StaminaTbl": 3,
                        "_Scale": 100,
                        "_ScaleTbl": 6,
                        "_Difficulty": 1,
                        "_BossMulti": 16,
                        "_IndividualType": 1,
                        "__QuestName": "Anomaly Research: Great Baggi"
                    }
                ]
            },
            "Icon": 14
        },
        "57": {
            "Id": 57,
            "Name": "Zinogre",
            "MapIds": [
                3,
                1,
                12,
                13
            ],
            "QuestType": [
                1
            ],
            "TargetTypes": [
                2
            ],
            "OrderType": 16,
            "QuestLevel": 3,
            "EnemyDataList": {
                "0": [
                    {
                        "_RouteNo": 10,
                        "_PartsTbl": 137,
                        "_InitSetName": "\u30e1\u30a4\u30f3",
                        "_SubType": 0,
                        "_VitalTbl": 123,
                        "_AttackTbl": 118,
                        "_OtherTbl": 135,
                        "_StaminaTbl": 3,
                        "_Scale": 100,
                        "_ScaleTbl": 6,
                        "_Difficulty": 2,
                        "_BossMulti": 16,
                        "_IndividualType": 0,
                        "__QuestName": "Sacrilegious Thunder Wolf"
                    },
                    {
                        "_RouteNo": 10,
                        "_PartsTbl": 137,
                        "_InitSetName": "\u30e1\u30a4\u30f3",
                        "_SubType": 0,
                        "_VitalTbl": 102,
                        "_AttackTbl": 119,
                        "_OtherTbl": 135,
                        "_StaminaTbl": 3,
                        "_Scale": 123,
                        "_ScaleTbl": 0,
                        "_Difficulty": 0,
                        "_BossMulti": 16,
                        "_IndividualType": 0,
                        "__QuestName": "Twin Sparks in the Dark"
                    },
                    {
                        "_RouteNo": 11,
                        "_PartsTbl": 137,
                        "_InitSetName": "2\u982d",
                        "_SubType": 0,
                        "_VitalTbl": 98,
                        "_AttackTbl": 119,
                        "_OtherTbl": 135,
                        "_StaminaTbl": 3,
                        "_Scale": 90,
                        "_ScaleTbl": 0,
                        "_Difficulty": 0,
                        "_BossMulti": 16,
                        "_IndividualType": 0,
                        "__QuestName": "Twin Sparks in the Dark"
                    },
                    {
                        "_RouteNo": 10,
                        "_PartsTbl": 137,
                        "_InitSetName": "\u30e1\u30a4\u30f3",
                        "_SubType": 0,
                        "_VitalTbl": 123,
                        "_AttackTbl": 118,
                        "_OtherTbl": 135,
                        "_StaminaTbl": 3,
                        "_Scale": 100,
                        "_ScaleTbl": 6,
                        "_Difficulty": 2,
                        "_BossMulti": 16,
                        "_IndividualType": 0,
                        "__QuestName": "Operation Zinogre"
                    },
                    {
                        "_RouteNo": 10,
                        "_PartsTbl": 137,
                        "_InitSetName": "\u30e1\u30a4\u30f3",
                        "_SubType": 0,
                        "_VitalTbl": 123,
                        "_AttackTbl": 118,
                        "_OtherTbl": 135,
                        "_StaminaTbl": 3,
                        "_Scale": 100,
                        "_ScaleTbl": 6,
                        "_Difficulty": 2,
                        "_BossMulti": 16,
                        "_IndividualType": 0,
                        "__QuestName": "An Ace Idea!"
                    }
                ],
                "1": []
            },
            "Icon": 15
        },
        "59": {
            "Id": 59,
            "Name": "Great Wroggi",
            "MapIds": [
                1,
                3,
                5,
                12
            ],
            "QuestType": [
                1,
                2
            ],
            "TargetTypes": [
                2,
                3
            ],
            "OrderType": 16,
            "QuestLevel": 0,
            "EnemyDataList": {
                "0": [
                    {
                        "_RouteNo": 10,
                        "_PartsTbl": 128,
                        "_InitSetName": "\u30e1\u30a4\u30f3",
                        "_SubType": 0,
                        "_VitalTbl": 92,
                        "_AttackTbl": 103,
                        "_OtherTbl": 130,
                        "_StaminaTbl": 3,
                        "_Scale": 123,
                        "_ScaleTbl": 0,
                        "_Difficulty": 0,
                        "_BossMulti": 16,
                        "_IndividualType": 0,
                        "__QuestName": "[REDACTED]"
                    },
                    {
                        "_RouteNo": 11,
                        "_PartsTbl": 128,
                        "_InitSetName": "2\u982d",
                        "_SubType": 0,
                        "_VitalTbl": 87,
                        "_AttackTbl": 103,
                        "_OtherTbl": 130,
                        "_StaminaTbl": 3,
                        "_Scale": 90,
                        "_ScaleTbl": 0,
                        "_Difficulty": 0,
                        "_BossMulti": 16,
                        "_IndividualType": 0,
                        "__QuestName": "[REDACTED]"
                    }
                ],
                "1": [
                    {
                        "_RouteNo": 10,
                        "_PartsTbl": 181,
                        "_InitSetName": "\u30e1\u30a4\u30f3",
                        "_SubType": 0,
                        "_VitalTbl": 154,
                        "_AttackTbl": 125,
                        "_OtherTbl": 153,
                        "_StaminaTbl": 3,
                        "_Scale": 100,
                        "_ScaleTbl": 6,
                        "_Difficulty": 1,
                        "_BossMulti": 16,
                        "_IndividualType": 1,
                        "__QuestName": "Anomaly Research: Great Wroggi"
                    }
                ]
            },
            "Icon": 16
        },
        "60": {
            "Id": 60,
            "Name": "Arzuros",
            "MapIds": [
                1,
                3,
                13
            ],
            "QuestType": [
                1,
                2
            ],
            "TargetTypes": [
                2,
                3
            ],
            "OrderType": 16,
            "QuestLevel": 0,
            "EnemyDataList": {
                "0": [
                    {
                        "_RouteNo": 10,
                        "_PartsTbl": 128,
                        "_InitSetName": "\u30e1\u30a4\u30f3",
                        "_SubType": 0,
                        "_VitalTbl": 92,
                        "_AttackTbl": 103,
                        "_OtherTbl": 130,
                        "_StaminaTbl": 3,
                        "_Scale": 123,
                        "_ScaleTbl": 0,
                        "_Difficulty": 0,
                        "_BossMulti": 16,
                        "_IndividualType": 0,
                        "__QuestName": "Catnap Ruined"
                    },
                    {
                        "_RouteNo": 11,
                        "_PartsTbl": 128,
                        "_InitSetName": "2\u982d",
                        "_SubType": 0,
                        "_VitalTbl": 87,
                        "_AttackTbl": 103,
                        "_OtherTbl": 130,
                        "_StaminaTbl": 3,
                        "_Scale": 90,
                        "_ScaleTbl": 0,
                        "_Difficulty": 0,
                        "_BossMulti": 16,
                        "_IndividualType": 0,
                        "__QuestName": "Catnap Ruined"
                    }
                ],
                "1": [
                    {
                        "_RouteNo": 10,
                        "_PartsTbl": 181,
                        "_InitSetName": "\u30e1\u30a4\u30f3",
                        "_SubType": 0,
                        "_VitalTbl": 145,
                        "_AttackTbl": 123,
                        "_OtherTbl": 153,
                        "_StaminaTbl": 3,
                        "_Scale": 100,
                        "_ScaleTbl": 6,
                        "_Difficulty": 1,
                        "_BossMulti": 16,
                        "_IndividualType": 1,
                        "__QuestName": "Anomaly Research: Arzuros"
                    }
                ]
            },
            "Icon": 17
        },
        "61": {
            "Id": 61,
            "Name": "Lagombi",
            "MapIds": [
                4,
                13
            ],
            "QuestType": [
                1,
                2
            ],
            "TargetTypes": [
                2,
                3
            ],
            "OrderType": 16,
            "QuestLevel": 0,
            "EnemyDataList": {
                "0": [
                    {
                        "_RouteNo": 10,
                        "_PartsTbl": 120,
                        "_InitSetName": "\u30e1\u30a4\u30f3",
                        "_SubType": 0,
                        "_VitalTbl": 107,
                        "_AttackTbl": 102,
                        "_OtherTbl": 130,
                        "_StaminaTbl": 3,
                        "_Scale": 100,
                        "_ScaleTbl": 6,
                        "_Difficulty": 2,
                        "_BossMulti": 16,
                        "_IndividualType": 0,
                        "__QuestName": "The Good, the Bad, and Lagombi"
                    }
                ],
                "1": [
                    {
                        "_RouteNo": 10,
                        "_PartsTbl": 181,
                        "_InitSetName": "\u30e1\u30a4\u30f3",
                        "_SubType": 0,
                        "_VitalTbl": 144,
                        "_AttackTbl": 125,
                        "_OtherTbl": 153,
                        "_StaminaTbl": 3,
                        "_Scale": 100,
                        "_ScaleTbl": 6,
                        "_Difficulty": 1,
                        "_BossMulti": 16,
                        "_IndividualType": 1,
                        "__QuestName": "Anomaly Research: Lagombi"
                    }
                ]
            },
            "Icon": 18
        },
        "62": {
            "Id": 62,
            "Name": "Volvidon",
            "MapIds": [
                2,
                5,
                13
            ],
            "QuestType": [
                1,
                2
            ],
            "TargetTypes": [
                2,
                3
            ],
            "OrderType": 16,
            "QuestLevel": 0,
            "EnemyDataList": {
                "0": [
                    {
                        "_RouteNo": 10,
                        "_PartsTbl": 120,
                        "_InitSetName": "\u30e1\u30a4\u30f3",
                        "_SubType": 0,
                        "_VitalTbl": 107,
                        "_AttackTbl": 102,
                        "_OtherTbl": 130,
                        "_StaminaTbl": 3,
                        "_Scale": 100,
                        "_ScaleTbl": 6,
                        "_Difficulty": 2,
                        "_BossMulti": 16,
                        "_IndividualType": 0,
                        "__QuestName": "The Red Rolling Terror"
                    }
                ],
                "1": [
                    {
                        "_RouteNo": 10,
                        "_PartsTbl": 181,
                        "_InitSetName": "\u30e1\u30a4\u30f3",
                        "_SubType": 0,
                        "_VitalTbl": 139,
                        "_AttackTbl": 123,
                        "_OtherTbl": 153,
                        "_StaminaTbl": 3,
                        "_Scale": 100,
                        "_ScaleTbl": 6,
                        "_Difficulty": 1,
                        "_BossMulti": 16,
                        "_IndividualType": 1,
                        "__QuestName": "Anomaly Research: Volvidon"
                    }
                ]
            },
            "Icon": 19
        },
        "71": {
            "Id": 71,
            "Name": "Gore Magala",
            "MapIds": [
                13,
                12,
                1,
                3
            ],
            "QuestType": [
                1
            ],
            "TargetTypes": [
                2
            ],
            "OrderType": 16,
            "QuestLevel": 3,
            "EnemyDataList": {
                "0": [
                    {
                        "_RouteNo": 10,
                        "_PartsTbl": 137,
                        "_InitSetName": "\u30e1\u30a4\u30f3",
                        "_SubType": 0,
                        "_VitalTbl": 123,
                        "_AttackTbl": 118,
                        "_OtherTbl": 135,
                        "_StaminaTbl": 3,
                        "_Scale": 100,
                        "_ScaleTbl": 20,
                        "_Difficulty": 2,
                        "_BossMulti": 16,
                        "_IndividualType": 0,
                        "__QuestName": "Dark Wings, Dark Work"
                    },
                    {
                        "_RouteNo": 10,
                        "_PartsTbl": 137,
                        "_InitSetName": "\u30e1\u30a4\u30f3",
                        "_SubType": 0,
                        "_VitalTbl": 123,
                        "_AttackTbl": 118,
                        "_OtherTbl": 135,
                        "_StaminaTbl": 3,
                        "_Scale": 100,
                        "_ScaleTbl": 20,
                        "_Difficulty": 2,
                        "_BossMulti": 16,
                        "_IndividualType": 0,
                        "__QuestName": "Operation Gore Magala"
                    },
                    {
                        "_RouteNo": 10,
                        "_PartsTbl": 137,
                        "_InitSetName": "\u30e1\u30a4\u30f3",
                        "_SubType": 0,
                        "_VitalTbl": 123,
                        "_AttackTbl": 118,
                        "_OtherTbl": 135,
                        "_StaminaTbl": 3,
                        "_Scale": 100,
                        "_ScaleTbl": 20,
                        "_Difficulty": 2,
                        "_BossMulti": 16,
                        "_IndividualType": 0,
                        "__QuestName": "Unknown Invader"
                    }
                ],
                "1": []
            },
            "Icon": 47
        },
        "72": {
            "Id": 72,
            "Name": "Shagaru Magala",
            "MapIds": [
                13
            ],
            "QuestType": [
                2
            ],
            "TargetTypes": [
                3
            ],
            "OrderType": 16,
            "QuestLevel": 4,
            "EnemyDataList": {
                "0": [
                    {
                        "_RouteNo": 10,
                        "_PartsTbl": 141,
                        "_InitSetName": "\u30e1\u30a4\u30f3",
                        "_SubType": 0,
                        "_VitalTbl": 129,
                        "_AttackTbl": 122,
                        "_OtherTbl": 136,
                        "_StaminaTbl": 3,
                        "_Scale": 100,
                        "_ScaleTbl": 20,
                        "_Difficulty": 2,
                        "_BossMulti": 16,
                        "_IndividualType": 0,
                        "__QuestName": "Dark Citadel, White Wheel"
                    }
                ],
                "1": []
            },
            "Icon": 48
        },
        "77": {
            "Id": 77,
            "Name": "Seregios",
            "MapIds": [
                2,
                1,
                13
            ],
            "QuestType": [
                1
            ],
            "TargetTypes": [
                2
            ],
            "OrderType": 16,
            "QuestLevel": 3,
            "EnemyDataList": {
                "0": [
                    {
                        "_RouteNo": 10,
                        "_PartsTbl": 137,
                        "_InitSetName": "\u30e1\u30a4\u30f3",
                        "_SubType": 0,
                        "_VitalTbl": 123,
                        "_AttackTbl": 118,
                        "_OtherTbl": 135,
                        "_StaminaTbl": 3,
                        "_Scale": 100,
                        "_ScaleTbl": 6,
                        "_Difficulty": 2,
                        "_BossMulti": 16,
                        "_IndividualType": 0,
                        "__QuestName": "A Thousand Scales of Dread"
                    },
                    {
                        "_RouteNo": 10,
                        "_PartsTbl": 137,
                        "_InitSetName": "\u30e1\u30a4\u30f3",
                        "_SubType": 0,
                        "_VitalTbl": 123,
                        "_AttackTbl": 118,
                        "_OtherTbl": 135,
                        "_StaminaTbl": 3,
                        "_Scale": 100,
                        "_ScaleTbl": 6,
                        "_Difficulty": 2,
                        "_BossMulti": 16,
                        "_IndividualType": 0,
                        "__QuestName": "Operation Seregios"
                    },
                    {
                        "_RouteNo": 10,
                        "_PartsTbl": 137,
                        "_InitSetName": "\u30e1\u30a4\u30f3",
                        "_SubType": 0,
                        "_VitalTbl": 123,
                        "_AttackTbl": 118,
                        "_OtherTbl": 135,
                        "_StaminaTbl": 3,
                        "_Scale": 100,
                        "_ScaleTbl": 6,
                        "_Difficulty": 2,
                        "_BossMulti": 16,
                        "_IndividualType": 0,
                        "__QuestName": "Dust off Those Hunting Boots"
                    }
                ],
                "1": []
            },
            "Icon": 49
        },
        "81": {
            "Id": 81,
            "Name": "Astalos",
            "MapIds": [
                1,
                3,
                12
            ],
            "QuestType": [
                1
            ],
            "TargetTypes": [
                2
            ],
            "OrderType": 16,
            "QuestLevel": 3,
            "EnemyDataList": {
                "0": [
                    {
                        "_RouteNo": 10,
                        "_PartsTbl": 137,
                        "_InitSetName": "\u30e1\u30a4\u30f3",
                        "_SubType": 0,
                        "_VitalTbl": 123,
                        "_AttackTbl": 116,
                        "_OtherTbl": 135,
                        "_StaminaTbl": 3,
                        "_Scale": 100,
                        "_ScaleTbl": 6,
                        "_Difficulty": 2,
                        "_BossMulti": 16,
                        "_IndividualType": 0,
                        "__QuestName": "In Search of the Doctor"
                    },
                    {
                        "_RouteNo": 10,
                        "_PartsTbl": 137,
                        "_InitSetName": "\u30e1\u30a4\u30f3",
                        "_SubType": 0,
                        "_VitalTbl": 123,
                        "_AttackTbl": 116,
                        "_OtherTbl": 135,
                        "_StaminaTbl": 3,
                        "_Scale": 100,
                        "_ScaleTbl": 6,
                        "_Difficulty": 2,
                        "_BossMulti": 16,
                        "_IndividualType": 0,
                        "__QuestName": "Operation Astalos"
                    },
                    {
                        "_RouteNo": 10,
                        "_PartsTbl": 137,
                        "_InitSetName": "\u30e1\u30a4\u30f3",
                        "_SubType": 0,
                        "_VitalTbl": 123,
                        "_AttackTbl": 116,
                        "_OtherTbl": 135,
                        "_StaminaTbl": 3,
                        "_Scale": 100,
                        "_ScaleTbl": 6,
                        "_Difficulty": 2,
                        "_BossMulti": 16,
                        "_IndividualType": 0,
                        "__QuestName": "Rumbling Tummy, Rumbling Thunder"
                    }
                ],
                "1": []
            },
            "Icon": 50
        },
        "82": {
            "Id": 82,
            "Name": "Mizutsune",
            "MapIds": [
                3,
                4,
                1,
                12
            ],
            "QuestType": [
                1
            ],
            "TargetTypes": [
                2
            ],
            "OrderType": 16,
            "QuestLevel": 3,
            "EnemyDataList": {
                "0": [
                    {
                        "_RouteNo": 10,
                        "_PartsTbl": 137,
                        "_InitSetName": "\u30e1\u30a4\u30f3",
                        "_SubType": 0,
                        "_VitalTbl": 123,
                        "_AttackTbl": 118,
                        "_OtherTbl": 135,
                        "_StaminaTbl": 3,
                        "_Scale": 100,
                        "_ScaleTbl": 6,
                        "_Difficulty": 2,
                        "_BossMulti": 16,
                        "_IndividualType": 0,
                        "__QuestName": "A Mizutsune's Appeal"
                    },
                    {
                        "_RouteNo": 10,
                        "_PartsTbl": 137,
                        "_InitSetName": "\u30e1\u30a4\u30f3",
                        "_SubType": 0,
                        "_VitalTbl": 123,
                        "_AttackTbl": 118,
                        "_OtherTbl": 135,
                        "_StaminaTbl": 3,
                        "_Scale": 100,
                        "_ScaleTbl": 6,
                        "_Difficulty": 2,
                        "_BossMulti": 16,
                        "_IndividualType": 0,
                        "__QuestName": "Operation Mizutsune"
                    },
                    {
                        "_RouteNo": 10,
                        "_PartsTbl": 137,
                        "_InitSetName": "\u30e1\u30a4\u30f3",
                        "_SubType": 0,
                        "_VitalTbl": 123,
                        "_AttackTbl": 118,
                        "_OtherTbl": 135,
                        "_StaminaTbl": 3,
                        "_Scale": 100,
                        "_ScaleTbl": 6,
                        "_Difficulty": 2,
                        "_BossMulti": 16,
                        "_IndividualType": 0,
                        "__QuestName": "Cherry Blossoms in Battle"
                    }
                ],
                "1": []
            },
            "Icon": 20
        },
        "89": {
            "Id": 89,
            "Name": "Magnamalo",
            "MapIds": [
                5,
                1,
                4
            ],
            "QuestType": [
                1,
                2
            ],
            "TargetTypes": [
                2,
                3
            ],
            "OrderType": 16,
            "QuestLevel": 2,
            "EnemyDataList": {
                "0": [
                    {
                        "_RouteNo": 10,
                        "_PartsTbl": 133,
                        "_InitSetName": "\u30e1\u30a4\u30f3",
                        "_SubType": 0,
                        "_VitalTbl": 119,
                        "_AttackTbl": 112,
                        "_OtherTbl": 132,
                        "_StaminaTbl": 3,
                        "_Scale": 100,
                        "_ScaleTbl": 6,
                        "_Difficulty": 2,
                        "_BossMulti": 16,
                        "_IndividualType": 0,
                        "__QuestName": "Purging Hatred"
                    },
                    {
                        "_RouteNo": 10,
                        "_PartsTbl": 133,
                        "_InitSetName": "\u30e1\u30a4\u30f3",
                        "_SubType": 0,
                        "_VitalTbl": 119,
                        "_AttackTbl": 112,
                        "_OtherTbl": 132,
                        "_StaminaTbl": 3,
                        "_Scale": 100,
                        "_ScaleTbl": 6,
                        "_Difficulty": 2,
                        "_BossMulti": 16,
                        "_IndividualType": 0,
                        "__QuestName": "Operation Magnamalo"
                    },
                    {
                        "_RouteNo": 10,
                        "_PartsTbl": 149,
                        "_InitSetName": "\u30e1\u30a4\u30f3",
                        "_SubType": 0,
                        "_VitalTbl": 118,
                        "_AttackTbl": 122,
                        "_OtherTbl": 137,
                        "_StaminaTbl": 3,
                        "_Scale": 123,
                        "_ScaleTbl": 0,
                        "_Difficulty": 0,
                        "_BossMulti": 16,
                        "_IndividualType": 0,
                        "__QuestName": "Operation Double Magnamalo"
                    },
                    {
                        "_RouteNo": 11,
                        "_PartsTbl": 149,
                        "_InitSetName": "2\u982d",
                        "_SubType": 0,
                        "_VitalTbl": 116,
                        "_AttackTbl": 122,
                        "_OtherTbl": 137,
                        "_StaminaTbl": 3,
                        "_Scale": 90,
                        "_ScaleTbl": 0,
                        "_Difficulty": 0,
                        "_BossMulti": 16,
                        "_IndividualType": 0,
                        "__QuestName": "Operation Double Magnamalo"
                    },
                    {
                        "_RouteNo": 10,
                        "_PartsTbl": 133,
                        "_InitSetName": "\u30e1\u30a4\u30f3",
                        "_SubType": 0,
                        "_VitalTbl": 119,
                        "_AttackTbl": 112,
                        "_OtherTbl": 132,
                        "_StaminaTbl": 3,
                        "_Scale": 100,
                        "_ScaleTbl": 6,
                        "_Difficulty": 2,
                        "_BossMulti": 16,
                        "_IndividualType": 0,
                        "__QuestName": "Enshrined Resentment"
                    },
                    {
                        "_RouteNo": 10,
                        "_PartsTbl": 149,
                        "_InitSetName": "\u30e1\u30a4\u30f3",
                        "_SubType": 0,
                        "_VitalTbl": 118,
                        "_AttackTbl": 122,
                        "_OtherTbl": 137,
                        "_StaminaTbl": 3,
                        "_Scale": 123,
                        "_ScaleTbl": 0,
                        "_Difficulty": 0,
                        "_BossMulti": 16,
                        "_IndividualType": 0,
                        "__QuestName": "Lava Caverns Litter Box"
                    },
                    {
                        "_RouteNo": 11,
                        "_PartsTbl": 149,
                        "_InitSetName": "2\u982d",
                        "_SubType": 0,
                        "_VitalTbl": 116,
                        "_AttackTbl": 122,
                        "_OtherTbl": 137,
                        "_StaminaTbl": 3,
                        "_Scale": 90,
                        "_ScaleTbl": 0,
                        "_Difficulty": 0,
                        "_BossMulti": 16,
                        "_IndividualType": 0,
                        "__QuestName": "Lava Caverns Litter Box"
                    }
                ],
                "1": [
                    {
                        "_RouteNo": 10,
                        "_PartsTbl": 184,
                        "_InitSetName": "\u30e1\u30a4\u30f3",
                        "_SubType": 0,
                        "_VitalTbl": 146,
                        "_AttackTbl": 125,
                        "_OtherTbl": 153,
                        "_StaminaTbl": 3,
                        "_Scale": 100,
                        "_ScaleTbl": 6,
                        "_Difficulty": 1,
                        "_BossMulti": 18,
                        "_IndividualType": 1,
                        "__QuestName": "Anomaly Research: Magnamalo"
                    }
                ]
            },
            "Icon": 22
        },
        "90": {
            "Id": 90,
            "Name": "Bishaten",
            "MapIds": [
                3,
                1,
                12
            ],
            "QuestType": [
                1,
                2
            ],
            "TargetTypes": [
                2,
                3
            ],
            "OrderType": 16,
            "QuestLevel": 1,
            "EnemyDataList": {
                "0": [
                    {
                        "_RouteNo": 10,
                        "_PartsTbl": 128,
                        "_InitSetName": "\u30e1\u30a4\u30f3",
                        "_SubType": 0,
                        "_VitalTbl": 115,
                        "_AttackTbl": 110,
                        "_OtherTbl": 131,
                        "_StaminaTbl": 3,
                        "_Scale": 100,
                        "_ScaleTbl": 17,
                        "_Difficulty": 2,
                        "_BossMulti": 16,
                        "_IndividualType": 0,
                        "__QuestName": "Sour Grapes"
                    },
                    {
                        "_RouteNo": 10,
                        "_PartsTbl": 128,
                        "_InitSetName": "\u30e1\u30a4\u30f3",
                        "_SubType": 0,
                        "_VitalTbl": 115,
                        "_AttackTbl": 110,
                        "_OtherTbl": 131,
                        "_StaminaTbl": 3,
                        "_Scale": 100,
                        "_ScaleTbl": 17,
                        "_Difficulty": 2,
                        "_BossMulti": 16,
                        "_IndividualType": 0,
                        "__QuestName": "Operation Bishaten"
                    },
                    {
                        "_RouteNo": 10,
                        "_PartsTbl": 128,
                        "_InitSetName": "\u30e1\u30a4\u30f3",
                        "_SubType": 0,
                        "_VitalTbl": 115,
                        "_AttackTbl": 110,
                        "_OtherTbl": 131,
                        "_StaminaTbl": 3,
                        "_Scale": 100,
                        "_ScaleTbl": 17,
                        "_Difficulty": 2,
                        "_BossMulti": 16,
                        "_IndividualType": 0,
                        "__QuestName": "Fruit Vs. Firearms"
                    }
                ],
                "1": [
                    {
                        "_RouteNo": 10,
                        "_PartsTbl": 182,
                        "_InitSetName": "\u30e1\u30a4\u30f3",
                        "_SubType": 0,
                        "_VitalTbl": 143,
                        "_AttackTbl": 126,
                        "_OtherTbl": 153,
                        "_StaminaTbl": 3,
                        "_Scale": 100,
                        "_ScaleTbl": 17,
                        "_Difficulty": 1,
                        "_BossMulti": 16,
                        "_IndividualType": 1,
                        "__QuestName": "Anomaly Research: Bishaten"
                    }
                ]
            },
            "Icon": 23
        },
        "91": {
            "Id": 91,
            "Name": "Aknosom",
            "MapIds": [
                1,
                4,
                12
            ],
            "QuestType": [
                1,
                2
            ],
            "TargetTypes": [
                2,
                3
            ],
            "OrderType": 16,
            "QuestLevel": 0,
            "EnemyDataList": {
                "0": [
                    {
                        "_RouteNo": 10,
                        "_PartsTbl": 120,
                        "_InitSetName": "\u30e1\u30a4\u30f3",
                        "_SubType": 0,
                        "_VitalTbl": 107,
                        "_AttackTbl": 102,
                        "_OtherTbl": 130,
                        "_StaminaTbl": 3,
                        "_Scale": 85,
                        "_ScaleTbl": 6,
                        "_Difficulty": 2,
                        "_BossMulti": 16,
                        "_IndividualType": 0,
                        "__QuestName": "It Could be Worse..."
                    }
                ],
                "1": [
                    {
                        "_RouteNo": 10,
                        "_PartsTbl": 182,
                        "_InitSetName": "\u30e1\u30a4\u30f3",
                        "_SubType": 0,
                        "_VitalTbl": 143,
                        "_AttackTbl": 126,
                        "_OtherTbl": 153,
                        "_StaminaTbl": 3,
                        "_Scale": 85,
                        "_ScaleTbl": 6,
                        "_Difficulty": 1,
                        "_BossMulti": 16,
                        "_IndividualType": 1,
                        "__QuestName": "Anomaly Research: Aknosom"
                    }
                ]
            },
            "Icon": 24
        },
        "92": {
            "Id": 92,
            "Name": "Tetranadon",
            "MapIds": [
                1,
                4,
                5,
                12
            ],
            "QuestType": [
                1,
                2
            ],
            "TargetTypes": [
                2,
                3
            ],
            "OrderType": 16,
            "QuestLevel": 0,
            "EnemyDataList": {
                "0": [
                    {
                        "_RouteNo": 10,
                        "_PartsTbl": 120,
                        "_InitSetName": "\u30e1\u30a4\u30f3",
                        "_SubType": 0,
                        "_VitalTbl": 104,
                        "_AttackTbl": 102,
                        "_OtherTbl": 130,
                        "_StaminaTbl": 3,
                        "_Scale": 100,
                        "_ScaleTbl": 6,
                        "_Difficulty": 2,
                        "_BossMulti": 16,
                        "_IndividualType": 0,
                        "__QuestName": "Tetranadon Blockade"
                    }
                ],
                "1": [
                    {
                        "_RouteNo": 10,
                        "_PartsTbl": 182,
                        "_InitSetName": "\u30e1\u30a4\u30f3",
                        "_SubType": 0,
                        "_VitalTbl": 142,
                        "_AttackTbl": 126,
                        "_OtherTbl": 153,
                        "_StaminaTbl": 3,
                        "_Scale": 100,
                        "_ScaleTbl": 6,
                        "_Difficulty": 1,
                        "_BossMulti": 16,
                        "_IndividualType": 1,
                        "__QuestName": "Anomaly Research: Tetranadon"
                    }
                ]
            },
            "Icon": 25
        },
        "93": {
            "Id": 93,
            "Name": "Somnacanth",
            "MapIds": [
                3,
                4,
                5
            ],
            "QuestType": [
                1,
                2
            ],
            "TargetTypes": [
                2,
                3
            ],
            "OrderType": 16,
            "QuestLevel": 1,
            "EnemyDataList": {
                "0": [
                    {
                        "_RouteNo": 10,
                        "_PartsTbl": 128,
                        "_InitSetName": "\u30e1\u30a4\u30f3",
                        "_SubType": 0,
                        "_VitalTbl": 115,
                        "_AttackTbl": 110,
                        "_OtherTbl": 131,
                        "_StaminaTbl": 3,
                        "_Scale": 100,
                        "_ScaleTbl": 6,
                        "_Difficulty": 2,
                        "_BossMulti": 16,
                        "_IndividualType": 0,
                        "__QuestName": "Somnacanth Sleep Aid"
                    }
                ],
                "1": [
                    {
                        "_RouteNo": 10,
                        "_PartsTbl": 183,
                        "_InitSetName": "\u30e1\u30a4\u30f3",
                        "_SubType": 0,
                        "_VitalTbl": 146,
                        "_AttackTbl": 126,
                        "_OtherTbl": 153,
                        "_StaminaTbl": 3,
                        "_Scale": 100,
                        "_ScaleTbl": 6,
                        "_Difficulty": 1,
                        "_BossMulti": 18,
                        "_IndividualType": 1,
                        "__QuestName": "Anomaly Research: Somnacanth"
                    }
                ]
            },
            "Icon": 26
        },
        "94": {
            "Id": 94,
            "Name": "Rakna-Kadaki",
            "MapIds": [
                5,
                2
            ],
            "QuestType": [
                1,
                2
            ],
            "TargetTypes": [
                2,
                3
            ],
            "OrderType": 16,
            "QuestLevel": 2,
            "EnemyDataList": {
                "0": [
                    {
                        "_RouteNo": 10,
                        "_PartsTbl": 133,
                        "_InitSetName": "\u30e1\u30a4\u30f3",
                        "_SubType": 0,
                        "_VitalTbl": 119,
                        "_AttackTbl": 114,
                        "_OtherTbl": 132,
                        "_StaminaTbl": 3,
                        "_Scale": 100,
                        "_ScaleTbl": 6,
                        "_Difficulty": 2,
                        "_BossMulti": 16,
                        "_IndividualType": 0,
                        "__QuestName": "A Sandy Spider Nest"
                    }
                ],
                "1": [
                    {
                        "_RouteNo": 10,
                        "_PartsTbl": 184,
                        "_InitSetName": "\u30e1\u30a4\u30f3",
                        "_SubType": 0,
                        "_VitalTbl": 146,
                        "_AttackTbl": 126,
                        "_OtherTbl": 153,
                        "_StaminaTbl": 3,
                        "_Scale": 100,
                        "_ScaleTbl": 6,
                        "_Difficulty": 1,
                        "_BossMulti": 18,
                        "_IndividualType": 1,
                        "__QuestName": "Anomaly Research: Rakna-Kadaki"
                    }
                ]
            },
            "Icon": 27,
        },
        "95": {
            "Id": 95,
            "Name": "Almudron",
            "MapIds": [
                3,
                2,
                1
            ],
            "QuestType": [
                1,
                2
            ],
            "TargetTypes": [
                2,
                3
            ],
            "OrderType": 16,
            "QuestLevel": 2,
            "EnemyDataList": {
                "0": [
                    {
                        "_RouteNo": 10,
                        "_PartsTbl": 133,
                        "_InitSetName": "\u30e1\u30a4\u30f3",
                        "_SubType": 0,
                        "_VitalTbl": 119,
                        "_AttackTbl": 114,
                        "_OtherTbl": 132,
                        "_StaminaTbl": 3,
                        "_Scale": 100,
                        "_ScaleTbl": 6,
                        "_Difficulty": 2,
                        "_BossMulti": 16,
                        "_IndividualType": 0,
                        "__QuestName": "Trial of the Almudron"
                    },
                    {
                        "_RouteNo": 10,
                        "_PartsTbl": 133,
                        "_InitSetName": "\u30e1\u30a4\u30f3",
                        "_SubType": 0,
                        "_VitalTbl": 119,
                        "_AttackTbl": 114,
                        "_OtherTbl": 132,
                        "_StaminaTbl": 3,
                        "_Scale": 100,
                        "_ScaleTbl": 6,
                        "_Difficulty": 2,
                        "_BossMulti": 16,
                        "_IndividualType": 0,
                        "__QuestName": "Operation Almudron"
                    },
                    {
                        "_RouteNo": 10,
                        "_PartsTbl": 133,
                        "_InitSetName": "\u30e1\u30a4\u30f3",
                        "_SubType": 0,
                        "_VitalTbl": 119,
                        "_AttackTbl": 114,
                        "_OtherTbl": 132,
                        "_StaminaTbl": 3,
                        "_Scale": 100,
                        "_ScaleTbl": 6,
                        "_Difficulty": 2,
                        "_BossMulti": 16,
                        "_IndividualType": 0,
                        "__QuestName": "A Muddy Revival"
                    }
                ],
                "1": [
                    {
                        "_RouteNo": 10,
                        "_PartsTbl": 184,
                        "_InitSetName": "\u30e1\u30a4\u30f3",
                        "_SubType": 0,
                        "_VitalTbl": 147,
                        "_AttackTbl": 126,
                        "_OtherTbl": 153,
                        "_StaminaTbl": 3,
                        "_Scale": 100,
                        "_ScaleTbl": 6,
                        "_Difficulty": 1,
                        "_BossMulti": 18,
                        "_IndividualType": 1,
                        "__QuestName": "Anomaly Research: Almudron"
                    }
                ]
            },
            "Icon": 28
        },
        "96": {
            "Id": 96,
            "Name": "Wind Serpent Ibushi",
            "MapIds": [],
            "QuestType": [],
            "TargetTypes": [],
            "OrderType": 99,
            "QuestLevel": 10,
            "EnemyDataList": {
                "0": [],
                "1": []
            },
            "Icon": 29
        },
        "97": {
            "Id": 97,
            "Name": "Goss Harag",
            "MapIds": [
                4,
                13
            ],
            "QuestType": [
                1,
                2
            ],
            "TargetTypes": [
                2,
                3
            ],
            "OrderType": 16,
            "QuestLevel": 2,
            "EnemyDataList": {
                "0": [
                    {
                        "_RouteNo": 10,
                        "_PartsTbl": 133,
                        "_InitSetName": "\u30e1\u30a4\u30f3",
                        "_SubType": 0,
                        "_VitalTbl": 119,
                        "_AttackTbl": 111,
                        "_OtherTbl": 132,
                        "_StaminaTbl": 3,
                        "_Scale": 100,
                        "_ScaleTbl": 6,
                        "_Difficulty": 2,
                        "_BossMulti": 16,
                        "_IndividualType": 0,
                        "__QuestName": "Oh, My Garsh Harag"
                    }
                ],
                "1": [
                    {
                        "_RouteNo": 10,
                        "_PartsTbl": 184,
                        "_InitSetName": "\u30e1\u30a4\u30f3",
                        "_SubType": 0,
                        "_VitalTbl": 146,
                        "_AttackTbl": 125,
                        "_OtherTbl": 153,
                        "_StaminaTbl": 3,
                        "_Scale": 100,
                        "_ScaleTbl": 6,
                        "_Difficulty": 1,
                        "_BossMulti": 18,
                        "_IndividualType": 1,
                        "__QuestName": "Anomaly Research: Goss Harag"
                    }
                ]
            },
            "Icon": 30
        },
        "98": {
            "Id": 98,
            "Name": "Great Izuchi",
            "MapIds": [
                4,
                1
            ],
            "QuestType": [
                1,
                2
            ],
            "TargetTypes": [
                2,
                3
            ],
            "OrderType": 16,
            "QuestLevel": 0,
            "EnemyDataList": {
                "0": [
                    {
                        "_RouteNo": 10,
                        "_PartsTbl": 128,
                        "_InitSetName": "\u30e1\u30a4\u30f3",
                        "_SubType": 0,
                        "_VitalTbl": 115,
                        "_AttackTbl": 102,
                        "_OtherTbl": 130,
                        "_StaminaTbl": 3,
                        "_Scale": 100,
                        "_ScaleTbl": 6,
                        "_Difficulty": 2,
                        "_BossMulti": 16,
                        "_IndividualType": 0,
                        "__QuestName": "Reap What You Saw"
                    }
                ],
                "1": [
                    {
                        "_RouteNo": 10,
                        "_PartsTbl": 181,
                        "_InitSetName": "\u30e1\u30a4\u30f3",
                        "_SubType": 0,
                        "_VitalTbl": 154,
                        "_AttackTbl": 125,
                        "_OtherTbl": 153,
                        "_StaminaTbl": 3,
                        "_Scale": 100,
                        "_ScaleTbl": 6,
                        "_Difficulty": 1,
                        "_BossMulti": 16,
                        "_IndividualType": 1,
                        "__QuestName": "Anomaly Research: Great Izuchi"
                    }
                ]
            },
            "Icon": 31
        },
        "99": {
            "Id": 99,
            "Name": "Thunder Serpent Narwa",
            "MapIds": [],
            "QuestType": [],
            "TargetTypes": [],
            "OrderType": 99,
            "QuestLevel": 10,
            "EnemyDataList": {
                "0": [],
                "1": []
            },
            "Icon": 32
        },
        "100": {
            "Id": 100,
            "Name": "Anjanath",
            "MapIds": [
                2,
                5,
                3,
                1,
                12,
                13
            ],
            "QuestType": [
                1,
                2
            ],
            "TargetTypes": [
                2,
                3
            ],
            "OrderType": 16,
            "QuestLevel": 1,
            "EnemyDataList": {
                "0": [
                    {
                        "_RouteNo": 10,
                        "_PartsTbl": 128,
                        "_InitSetName": "\u30e1\u30a4\u30f3",
                        "_SubType": 0,
                        "_VitalTbl": 115,
                        "_AttackTbl": 107,
                        "_OtherTbl": 131,
                        "_StaminaTbl": 3,
                        "_Scale": 100,
                        "_ScaleTbl": 6,
                        "_Difficulty": 2,
                        "_BossMulti": 16,
                        "_IndividualType": 0,
                        "__QuestName": "Provoking an Anjanath's Wrath"
                    },
                    {
                        "_RouteNo": 10,
                        "_PartsTbl": 128,
                        "_InitSetName": "\u30e1\u30a4\u30f3",
                        "_SubType": 0,
                        "_VitalTbl": 115,
                        "_AttackTbl": 107,
                        "_OtherTbl": 131,
                        "_StaminaTbl": 3,
                        "_Scale": 100,
                        "_ScaleTbl": 6,
                        "_Difficulty": 2,
                        "_BossMulti": 16,
                        "_IndividualType": 0,
                        "__QuestName": "Operation Anjanath"
                    }
                ],
                "1": [
                    {
                        "_RouteNo": 10,
                        "_PartsTbl": 183,
                        "_InitSetName": "\u30e1\u30a4\u30f3",
                        "_SubType": 0,
                        "_VitalTbl": 147,
                        "_AttackTbl": 126,
                        "_OtherTbl": 153,
                        "_StaminaTbl": 3,
                        "_Scale": 100,
                        "_ScaleTbl": 6,
                        "_Difficulty": 1,
                        "_BossMulti": 18,
                        "_IndividualType": 1,
                        "__QuestName": "Anomaly Research: Anjanath"
                    }
                ]
            },
            "Icon": 33
        },
        "102": {
            "Id": 102,
            "Name": "Pukei-Pukei",
            "MapIds": [
                2,
                3,
                1
            ],
            "QuestType": [
                1,
                2
            ],
            "TargetTypes": [
                2,
                3
            ],
            "OrderType": 16,
            "QuestLevel": 1,
            "EnemyDataList": {
                "0": [
                    {
                        "_RouteNo": 10,
                        "_PartsTbl": 128,
                        "_InitSetName": "\u30e1\u30a4\u30f3",
                        "_SubType": 0,
                        "_VitalTbl": 115,
                        "_AttackTbl": 110,
                        "_OtherTbl": 131,
                        "_StaminaTbl": 3,
                        "_Scale": 100,
                        "_ScaleTbl": 6,
                        "_Difficulty": 2,
                        "_BossMulti": 16,
                        "_IndividualType": 0,
                        "__QuestName": "Poison Drops in the Sand"
                    }
                ],
                "1": [
                    {
                        "_RouteNo": 10,
                        "_PartsTbl": 183,
                        "_InitSetName": "\u30e1\u30a4\u30f3",
                        "_SubType": 0,
                        "_VitalTbl": 152,
                        "_AttackTbl": 126,
                        "_OtherTbl": 153,
                        "_StaminaTbl": 3,
                        "_Scale": 100,
                        "_ScaleTbl": 6,
                        "_Difficulty": 1,
                        "_BossMulti": 18,
                        "_IndividualType": 1,
                        "__QuestName": "Anomaly Research: Pukei-Pukei"
                    }
                ]
            },
            "Icon": 34
        },
        "107": {
            "Id": 107,
            "Name": "Kulu-Ya-Ku",
            "MapIds": [
                1,
                2,
                3,
                5,
                12
            ],
            "QuestType": [
                1,
                2
            ],
            "TargetTypes": [
                2,
                3
            ],
            "OrderType": 16,
            "QuestLevel": 0,
            "EnemyDataList": {
                "0": [
                    {
                        "_RouteNo": 10,
                        "_PartsTbl": 128,
                        "_InitSetName": "\u30e1\u30a4\u30f3",
                        "_SubType": 0,
                        "_VitalTbl": 115,
                        "_AttackTbl": 102,
                        "_OtherTbl": 130,
                        "_StaminaTbl": 3,
                        "_Scale": 100,
                        "_ScaleTbl": 6,
                        "_Difficulty": 2,
                        "_BossMulti": 16,
                        "_IndividualType": 0,
                        "__QuestName": "Need a Hunter, ASAP!"
                    }
                ],
                "1": [
                    {
                        "_RouteNo": 10,
                        "_PartsTbl": 181,
                        "_InitSetName": "\u30e1\u30a4\u30f3",
                        "_SubType": 0,
                        "_VitalTbl": 150,
                        "_AttackTbl": 125,
                        "_OtherTbl": 153,
                        "_StaminaTbl": 3,
                        "_Scale": 100,
                        "_ScaleTbl": 6,
                        "_Difficulty": 1,
                        "_BossMulti": 16,
                        "_IndividualType": 1,
                        "__QuestName": "Anomaly Research: Kulu-Ya-Ku"
                    }
                ]
            },
            "Icon": 35
        },
        "108": {
            "Id": 108,
            "Name": "Jyuratodus",
            "MapIds": [
                3
            ],
            "QuestType": [
                1,
                2
            ],
            "TargetTypes": [
                2,
                3
            ],
            "OrderType": 16,
            "QuestLevel": 1,
            "EnemyDataList": {
                "0": [
                    {
                        "_RouteNo": 10,
                        "_PartsTbl": 128,
                        "_InitSetName": "\u30e1\u30a4\u30f3",
                        "_SubType": 0,
                        "_VitalTbl": 115,
                        "_AttackTbl": 117,
                        "_OtherTbl": 131,
                        "_StaminaTbl": 3,
                        "_Scale": 100,
                        "_ScaleTbl": 6,
                        "_Difficulty": 2,
                        "_BossMulti": 16,
                        "_IndividualType": 0,
                        "__QuestName": "Messed Up Situation"
                    }
                ],
                "1": [
                    {
                        "_RouteNo": 10,
                        "_PartsTbl": 183,
                        "_InitSetName": "\u30e1\u30a4\u30f3",
                        "_SubType": 0,
                        "_VitalTbl": 146,
                        "_AttackTbl": 132,
                        "_OtherTbl": 153,
                        "_StaminaTbl": 3,
                        "_Scale": 100,
                        "_ScaleTbl": 6,
                        "_Difficulty": 1,
                        "_BossMulti": 18,
                        "_IndividualType": 1,
                        "__QuestName": "Anomaly Research: Jyuratodus"
                    }
                ]
            },
            "Icon": 36
        },
        "109": {
            "Id": 109,
            "Name": "Tobi-Kadachi",
            "MapIds": [
                3,
                1,
                12
            ],
            "QuestType": [
                1,
                2
            ],
            "TargetTypes": [
                2,
                3
            ],
            "OrderType": 16,
            "QuestLevel": 1,
            "EnemyDataList": {
                "0": [
                    {
                        "_RouteNo": 10,
                        "_PartsTbl": 128,
                        "_InitSetName": "\u30e1\u30a4\u30f3",
                        "_SubType": 0,
                        "_VitalTbl": 115,
                        "_AttackTbl": 108,
                        "_OtherTbl": 131,
                        "_StaminaTbl": 3,
                        "_Scale": 100,
                        "_ScaleTbl": 6,
                        "_Difficulty": 2,
                        "_BossMulti": 16,
                        "_IndividualType": 0,
                        "__QuestName": "Rumble in the Jungle"
                    },
                    {
                        "_RouteNo": 10,
                        "_PartsTbl": 128,
                        "_InitSetName": "\u30e1\u30a4\u30f3",
                        "_SubType": 0,
                        "_VitalTbl": 115,
                        "_AttackTbl": 108,
                        "_OtherTbl": 131,
                        "_StaminaTbl": 3,
                        "_Scale": 100,
                        "_ScaleTbl": 6,
                        "_Difficulty": 2,
                        "_BossMulti": 16,
                        "_IndividualType": 0,
                        "__QuestName": "Operation Tobi-Kadachi"
                    },
                    {
                        "_RouteNo": 10,
                        "_PartsTbl": 128,
                        "_InitSetName": "\u30e1\u30a4\u30f3",
                        "_SubType": 0,
                        "_VitalTbl": 115,
                        "_AttackTbl": 108,
                        "_OtherTbl": 131,
                        "_StaminaTbl": 3,
                        "_Scale": 100,
                        "_ScaleTbl": 6,
                        "_Difficulty": 2,
                        "_BossMulti": 16,
                        "_IndividualType": 0,
                        "__QuestName": "Flicker in the Night"
                    }
                ],
                "1": [
                    {
                        "_RouteNo": 10,
                        "_PartsTbl": 183,
                        "_InitSetName": "\u30e1\u30a4\u30f3",
                        "_SubType": 0,
                        "_VitalTbl": 146,
                        "_AttackTbl": 126,
                        "_OtherTbl": 153,
                        "_StaminaTbl": 3,
                        "_Scale": 100,
                        "_ScaleTbl": 6,
                        "_Difficulty": 1,
                        "_BossMulti": 18,
                        "_IndividualType": 1,
                        "__QuestName": "Anomaly Research: Tobi-Kadachi"
                    }
                ]
            },
            "Icon": 37
        },
        "118": {
            "Id": 118,
            "Name": "Bazelgeuse",
            "MapIds": [
                1,
                4,
                3,
                2,
                5,
                13,
                12
            ],
            "QuestType": [
                1
            ],
            "TargetTypes": [
                2
            ],
            "OrderType": 16,
            "QuestLevel": 4,
            "EnemyDataList": {
                "0": [
                    {
                        "_RouteNo": 10,
                        "_PartsTbl": 141,
                        "_InitSetName": "\u30e1\u30a4\u30f3",
                        "_SubType": 0,
                        "_VitalTbl": 129,
                        "_AttackTbl": 122,
                        "_OtherTbl": 136,
                        "_StaminaTbl": 3,
                        "_Scale": 100,
                        "_ScaleTbl": 6,
                        "_Difficulty": 2,
                        "_BossMulti": 16,
                        "_IndividualType": 0,
                        "__QuestName": "Bazelgeuse Warning"
                    },
                    {
                        "_RouteNo": 10,
                        "_PartsTbl": 149,
                        "_InitSetName": "\u30e1\u30a4\u30f3",
                        "_SubType": 0,
                        "_VitalTbl": 118,
                        "_AttackTbl": 124,
                        "_OtherTbl": 137,
                        "_StaminaTbl": 3,
                        "_Scale": 123,
                        "_ScaleTbl": 0,
                        "_Difficulty": 0,
                        "_BossMulti": 16,
                        "_IndividualType": 0,
                        "__QuestName": "Bested by Bazelgeuse"
                    },
                    {
                        "_RouteNo": 11,
                        "_PartsTbl": 149,
                        "_InitSetName": "2\u982d",
                        "_SubType": 0,
                        "_VitalTbl": 116,
                        "_AttackTbl": 124,
                        "_OtherTbl": 137,
                        "_StaminaTbl": 3,
                        "_Scale": 90,
                        "_ScaleTbl": 0,
                        "_Difficulty": 0,
                        "_BossMulti": 16,
                        "_IndividualType": 0,
                        "__QuestName": "Bested by Bazelgeuse"
                    },
                    {
                        "_RouteNo": 10,
                        "_PartsTbl": 141,
                        "_InitSetName": "\u30e1\u30a4\u30f3",
                        "_SubType": 0,
                        "_VitalTbl": 129,
                        "_AttackTbl": 122,
                        "_OtherTbl": 136,
                        "_StaminaTbl": 3,
                        "_Scale": 100,
                        "_ScaleTbl": 6,
                        "_Difficulty": 2,
                        "_BossMulti": 16,
                        "_IndividualType": 0,
                        "__QuestName": "Operation Bazelgeuse"
                    },
                    {
                        "_RouteNo": 10,
                        "_PartsTbl": 141,
                        "_InitSetName": "\u30e1\u30a4\u30f3",
                        "_SubType": 0,
                        "_VitalTbl": 129,
                        "_AttackTbl": 122,
                        "_OtherTbl": 136,
                        "_StaminaTbl": 3,
                        "_Scale": 100,
                        "_ScaleTbl": 6,
                        "_Difficulty": 2,
                        "_BossMulti": 16,
                        "_IndividualType": 0,
                        "__QuestName": "Fire Vs. Fire"
                    }
                ],
                "1": []
            },
            "Icon": 38
        },
        "132": {
            "Id": 132,
            "Name": "Malzeno",
            "MapIds": [
                13,
                1
            ],
            "QuestType": [
                2
            ],
            "TargetTypes": [
                3
            ],
            "OrderType": 16,
            "QuestLevel": 4,
            "EnemyDataList": {
                "0": [
                    {
                        "_RouteNo": 10,
                        "_PartsTbl": 141,
                        "_InitSetName": "\u30e1\u30a4\u30f3",
                        "_SubType": 0,
                        "_VitalTbl": 129,
                        "_AttackTbl": 122,
                        "_OtherTbl": 136,
                        "_StaminaTbl": 3,
                        "_Scale": 100,
                        "_ScaleTbl": 20,
                        "_Difficulty": 2,
                        "_BossMulti": 16,
                        "_IndividualType": 0,
                        "__QuestName": "Crimson Moonlight"
                    },
                    {
                        "_RouteNo": 10,
                        "_PartsTbl": 141,
                        "_InitSetName": "\u30e1\u30a4\u30f3",
                        "_SubType": 0,
                        "_VitalTbl": 129,
                        "_AttackTbl": 122,
                        "_OtherTbl": 136,
                        "_StaminaTbl": 3,
                        "_Scale": 100,
                        "_ScaleTbl": 20,
                        "_Difficulty": 2,
                        "_BossMulti": 16,
                        "_IndividualType": 0,
                        "__QuestName": "Witness by Moonlight"
                    }
                ],
                "1": []
            },
            "Icon": 58
        },
        "133": {
            "Id": 133,
            "Name": "Lunagaron",
            "MapIds": [
                13,
                1,
                4,
                12
            ],
            "QuestType": [
                1
            ],
            "TargetTypes": [
                2
            ],
            "OrderType": 16,
            "QuestLevel": 3,
            "EnemyDataList": {
                "0": [
                    {
                        "_RouteNo": 10,
                        "_PartsTbl": 137,
                        "_InitSetName": "\u30e1\u30a4\u30f3",
                        "_SubType": 0,
                        "_VitalTbl": 123,
                        "_AttackTbl": 118,
                        "_OtherTbl": 135,
                        "_StaminaTbl": 3,
                        "_Scale": 100,
                        "_ScaleTbl": 6,
                        "_Difficulty": 2,
                        "_BossMulti": 16,
                        "_IndividualType": 0,
                        "__QuestName": "Howling Moon"
                    },
                    {
                        "_RouteNo": 10,
                        "_PartsTbl": 141,
                        "_InitSetName": "8",
                        "_SubType": 1,
                        "_VitalTbl": 115,
                        "_AttackTbl": 122,
                        "_OtherTbl": 136,
                        "_StaminaTbl": 3,
                        "_Scale": 100,
                        "_ScaleTbl": 6,
                        "_Difficulty": 2,
                        "_BossMulti": 16,
                        "_IndividualType": 0,
                        "__QuestName": "Gathering of the Qurio"
                    },
                    {
                        "_RouteNo": 10,
                        "_PartsTbl": 137,
                        "_InitSetName": "\u30e1\u30a4\u30f3",
                        "_SubType": 0,
                        "_VitalTbl": 123,
                        "_AttackTbl": 118,
                        "_OtherTbl": 135,
                        "_StaminaTbl": 3,
                        "_Scale": 100,
                        "_ScaleTbl": 6,
                        "_Difficulty": 2,
                        "_BossMulti": 16,
                        "_IndividualType": 0,
                        "__QuestName": "Ice Wolf, Red Moon"
                    },
                    {
                        "_RouteNo": 10,
                        "_PartsTbl": 137,
                        "_InitSetName": "\u30e1\u30a4\u30f3",
                        "_SubType": 0,
                        "_VitalTbl": 123,
                        "_AttackTbl": 118,
                        "_OtherTbl": 135,
                        "_StaminaTbl": 3,
                        "_Scale": 100,
                        "_ScaleTbl": 6,
                        "_Difficulty": 2,
                        "_BossMulti": 16,
                        "_IndividualType": 0,
                        "__QuestName": "Operation Lunagaron"
                    },
                    {
                        "_RouteNo": 10,
                        "_PartsTbl": 137,
                        "_InitSetName": "\u30e1\u30a4\u30f3",
                        "_SubType": 0,
                        "_VitalTbl": 123,
                        "_AttackTbl": 118,
                        "_OtherTbl": 135,
                        "_StaminaTbl": 3,
                        "_Scale": 100,
                        "_ScaleTbl": 6,
                        "_Difficulty": 2,
                        "_BossMulti": 16,
                        "_IndividualType": 0,
                        "__QuestName": "Breaking the Ice"
                    }
                ],
                "1": []
            },
            "Icon": 59
        },
        "134": {
            "Id": 134,
            "Name": "Garangolm",
            "MapIds": [
                13,
                3
            ],
            "QuestType": [
                1,
                2
            ],
            "TargetTypes": [
                2,
                3
            ],
            "OrderType": 16,
            "QuestLevel": 2,
            "EnemyDataList": {
                "0": [
                    {
                        "_RouteNo": 10,
                        "_PartsTbl": 133,
                        "_InitSetName": "\u30e1\u30a4\u30f3",
                        "_SubType": 0,
                        "_VitalTbl": 119,
                        "_AttackTbl": 114,
                        "_OtherTbl": 132,
                        "_StaminaTbl": 3,
                        "_Scale": 100,
                        "_ScaleTbl": 20,
                        "_Difficulty": 2,
                        "_BossMulti": 17,
                        "_IndividualType": 0,
                        "__QuestName": "Garangolm Gone Mad"
                    },
                    {
                        "_RouteNo": 10,
                        "_PartsTbl": 133,
                        "_InitSetName": "\u30e1\u30a4\u30f3",
                        "_SubType": 0,
                        "_VitalTbl": 119,
                        "_AttackTbl": 114,
                        "_OtherTbl": 132,
                        "_StaminaTbl": 3,
                        "_Scale": 100,
                        "_ScaleTbl": 20,
                        "_Difficulty": 2,
                        "_BossMulti": 17,
                        "_IndividualType": 0,
                        "__QuestName": "A Rocky Rampage"
                    },
                    {
                        "_RouteNo": 10,
                        "_PartsTbl": 133,
                        "_InitSetName": "\u30e1\u30a4\u30f3",
                        "_SubType": 0,
                        "_VitalTbl": 119,
                        "_AttackTbl": 114,
                        "_OtherTbl": 132,
                        "_StaminaTbl": 3,
                        "_Scale": 100,
                        "_ScaleTbl": 20,
                        "_Difficulty": 2,
                        "_BossMulti": 17,
                        "_IndividualType": 0,
                        "__QuestName": "Operation Garangolm"
                    },
                    {
                        "_RouteNo": 10,
                        "_PartsTbl": 141,
                        "_InitSetName": "\u30e1\u30a4\u30f3",
                        "_SubType": 0,
                        "_VitalTbl": 109,
                        "_AttackTbl": 123,
                        "_OtherTbl": 136,
                        "_StaminaTbl": 3,
                        "_Scale": 117,
                        "_ScaleTbl": 0,
                        "_Difficulty": 0,
                        "_BossMulti": 17,
                        "_IndividualType": 0,
                        "__QuestName": "Operation Double Garangolm"
                    },
                    {
                        "_RouteNo": 11,
                        "_PartsTbl": 141,
                        "_InitSetName": "2\u982d",
                        "_SubType": 0,
                        "_VitalTbl": 104,
                        "_AttackTbl": 123,
                        "_OtherTbl": 136,
                        "_StaminaTbl": 3,
                        "_Scale": 90,
                        "_ScaleTbl": 0,
                        "_Difficulty": 0,
                        "_BossMulti": 17,
                        "_IndividualType": 0,
                        "__QuestName": "Operation Double Garangolm"
                    },
                    {
                        "_RouteNo": 10,
                        "_PartsTbl": 133,
                        "_InitSetName": "\u30e1\u30a4\u30f3",
                        "_SubType": 0,
                        "_VitalTbl": 119,
                        "_AttackTbl": 114,
                        "_OtherTbl": 132,
                        "_StaminaTbl": 3,
                        "_Scale": 100,
                        "_ScaleTbl": 20,
                        "_Difficulty": 2,
                        "_BossMulti": 17,
                        "_IndividualType": 0,
                        "__QuestName": "A Tough Lesson"
                    }
                ],
                "1": [
                    {
                        "_RouteNo": 10,
                        "_PartsTbl": 184,
                        "_InitSetName": "\u30e1\u30a4\u30f3",
                        "_SubType": 0,
                        "_VitalTbl": 147,
                        "_AttackTbl": 126,
                        "_OtherTbl": 153,
                        "_StaminaTbl": 3,
                        "_Scale": 100,
                        "_ScaleTbl": 20,
                        "_Difficulty": 1,
                        "_BossMulti": 19,
                        "_IndividualType": 1,
                        "__QuestName": "Anomaly Research: Garangolm"
                    }
                ]
            },
            "Icon": 60
        },
        "135": {
            "Id": 135,
            "Name": "Gaismagorm",
            "MapIds": [],
            "QuestType": [],
            "TargetTypes": [],
            "OrderType": 99,
            "QuestLevel": 10,
            "EnemyDataList": {
                "0": [],
                "1": []
            },
            "Icon": 61
        },
        "136": {
            "Id": 136,
            "Name": "Espinas",
            "MapIds": [
                12,
                13
            ],
            "QuestType": [
                1
            ],
            "TargetTypes": [
                2
            ],
            "OrderType": 16,
            "QuestLevel": 3,
            "EnemyDataList": {
                "0": [
                    {
                        "_RouteNo": 10,
                        "_PartsTbl": 137,
                        "_InitSetName": "\u30e1\u30a4\u30f3",
                        "_SubType": 1,
                        "_VitalTbl": 123,
                        "_AttackTbl": 118,
                        "_OtherTbl": 135,
                        "_StaminaTbl": 3,
                        "_Scale": 100,
                        "_ScaleTbl": 6,
                        "_Difficulty": 2,
                        "_BossMulti": 16,
                        "_IndividualType": 0,
                        "__QuestName": "A Slumbering Jungle Espinas"
                    },
                    {
                        "_RouteNo": 10,
                        "_PartsTbl": 137,
                        "_InitSetName": "\u30e1\u30a4\u30f3",
                        "_SubType": 1,
                        "_VitalTbl": 123,
                        "_AttackTbl": 118,
                        "_OtherTbl": 135,
                        "_StaminaTbl": 3,
                        "_Scale": 100,
                        "_ScaleTbl": 6,
                        "_Difficulty": 2,
                        "_BossMulti": 16,
                        "_IndividualType": 0,
                        "__QuestName": "Operation Espinas"
                    },
                    {
                        "_RouteNo": 10,
                        "_PartsTbl": 137,
                        "_InitSetName": "\u30e1\u30a4\u30f3",
                        "_SubType": 1,
                        "_VitalTbl": 123,
                        "_AttackTbl": 118,
                        "_OtherTbl": 135,
                        "_StaminaTbl": 3,
                        "_Scale": 100,
                        "_ScaleTbl": 6,
                        "_Difficulty": 2,
                        "_BossMulti": 16,
                        "_IndividualType": 0,
                        "__QuestName": "Moonlit Espinascapade"
                    }
                ],
                "1": []
            },
            "Icon": 62
        },
        "346": {
            "Id": 346,
            "Name": "Blood Orange Bishaten",
            "MapIds": [
                2,
                1,
                13
            ],
            "QuestType": [
                1,
                2
            ],
            "TargetTypes": [
                2,
                3
            ],
            "OrderType": 16,
            "QuestLevel": 1,
            "EnemyDataList": {
                "0": [
                    {
                        "_RouteNo": 10,
                        "_PartsTbl": 128,
                        "_InitSetName": "\u30e1\u30a4\u30f3",
                        "_SubType": 0,
                        "_VitalTbl": 115,
                        "_AttackTbl": 110,
                        "_OtherTbl": 131,
                        "_StaminaTbl": 3,
                        "_Scale": 100,
                        "_ScaleTbl": 17,
                        "_Difficulty": 2,
                        "_BossMulti": 16,
                        "_IndividualType": 0,
                        "__QuestName": "The Assault of the Scarlet Tengu"
                    },
                    {
                        "_RouteNo": 10,
                        "_PartsTbl": 128,
                        "_InitSetName": "\u30e1\u30a4\u30f3",
                        "_SubType": 0,
                        "_VitalTbl": 94,
                        "_AttackTbl": 111,
                        "_OtherTbl": 131,
                        "_StaminaTbl": 3,
                        "_Scale": 114,
                        "_ScaleTbl": 0,
                        "_Difficulty": 0,
                        "_BossMulti": 16,
                        "_IndividualType": 0,
                        "__QuestName": "Pinecone Pelting Panic"
                    },
                    {
                        "_RouteNo": 11,
                        "_PartsTbl": 128,
                        "_InitSetName": "2\u982d",
                        "_SubType": 0,
                        "_VitalTbl": 91,
                        "_AttackTbl": 111,
                        "_OtherTbl": 131,
                        "_StaminaTbl": 3,
                        "_Scale": 90,
                        "_ScaleTbl": 0,
                        "_Difficulty": 0,
                        "_BossMulti": 16,
                        "_IndividualType": 0,
                        "__QuestName": "Pinecone Pelting Panic"
                    },
                    {
                        "_RouteNo": 10,
                        "_PartsTbl": 128,
                        "_InitSetName": "\u30e1\u30a4\u30f3",
                        "_SubType": 0,
                        "_VitalTbl": 115,
                        "_AttackTbl": 110,
                        "_OtherTbl": 131,
                        "_StaminaTbl": 3,
                        "_Scale": 100,
                        "_ScaleTbl": 17,
                        "_Difficulty": 2,
                        "_BossMulti": 16,
                        "_IndividualType": 0,
                        "__QuestName": "Scarlet Tengu in the Shrine Ruins"
                    },
                    {
                        "_RouteNo": 10,
                        "_PartsTbl": 128,
                        "_InitSetName": "\u30e1\u30a4\u30f3",
                        "_SubType": 0,
                        "_VitalTbl": 115,
                        "_AttackTbl": 110,
                        "_OtherTbl": 131,
                        "_StaminaTbl": 3,
                        "_Scale": 100,
                        "_ScaleTbl": 17,
                        "_Difficulty": 2,
                        "_BossMulti": 16,
                        "_IndividualType": 0,
                        "__QuestName": "Operation Blood Orange Bishaten"
                    }
                ],
                "1": [
                    {
                        "_RouteNo": 10,
                        "_PartsTbl": 183,
                        "_InitSetName": "\u30e1\u30a4\u30f3",
                        "_SubType": 0,
                        "_VitalTbl": 146,
                        "_AttackTbl": 126,
                        "_OtherTbl": 153,
                        "_StaminaTbl": 3,
                        "_Scale": 100,
                        "_ScaleTbl": 17,
                        "_Difficulty": 1,
                        "_BossMulti": 18,
                        "_IndividualType": 1,
                        "__QuestName": "Anomaly Research: Blood Orange Bishaten"
                    }
                ]
            },
            "Icon": 53
        },
        "349": {
            "Id": 349,
            "Name": "Aurora Somnacanth",
            "MapIds": [
                4,
                13
            ],
            "QuestType": [
                1,
                2
            ],
            "TargetTypes": [
                2,
                3
            ],
            "OrderType": 16,
            "QuestLevel": 2,
            "EnemyDataList": {
                "0": [
                    {
                        "_RouteNo": 10,
                        "_PartsTbl": 133,
                        "_InitSetName": "\u30e1\u30a4\u30f3",
                        "_SubType": 0,
                        "_VitalTbl": 119,
                        "_AttackTbl": 114,
                        "_OtherTbl": 132,
                        "_StaminaTbl": 3,
                        "_Scale": 100,
                        "_ScaleTbl": 6,
                        "_Difficulty": 2,
                        "_BossMulti": 16,
                        "_IndividualType": 0,
                        "__QuestName": "Keep it Busy"
                    },
                    {
                        "_RouteNo": 10,
                        "_PartsTbl": 133,
                        "_InitSetName": "\u30e1\u30a4\u30f3",
                        "_SubType": 0,
                        "_VitalTbl": 119,
                        "_AttackTbl": 114,
                        "_OtherTbl": 132,
                        "_StaminaTbl": 3,
                        "_Scale": 100,
                        "_ScaleTbl": 6,
                        "_Difficulty": 2,
                        "_BossMulti": 16,
                        "_IndividualType": 0,
                        "__QuestName": "Operation Aurora Somnacanth"
                    },
                    {
                        "_RouteNo": 10,
                        "_PartsTbl": 133,
                        "_InitSetName": "\u30e1\u30a4\u30f3",
                        "_SubType": 0,
                        "_VitalTbl": 119,
                        "_AttackTbl": 114,
                        "_OtherTbl": 132,
                        "_StaminaTbl": 3,
                        "_Scale": 100,
                        "_ScaleTbl": 6,
                        "_Difficulty": 2,
                        "_BossMulti": 16,
                        "_IndividualType": 0,
                        "__QuestName": "Passion Melts Ice"
                    }
                ],
                "1": [
                    {
                        "_RouteNo": 10,
                        "_PartsTbl": 184,
                        "_InitSetName": "\u30e1\u30a4\u30f3",
                        "_SubType": 0,
                        "_VitalTbl": 146,
                        "_AttackTbl": 126,
                        "_OtherTbl": 153,
                        "_StaminaTbl": 3,
                        "_Scale": 100,
                        "_ScaleTbl": 6,
                        "_Difficulty": 1,
                        "_BossMulti": 18,
                        "_IndividualType": 1,
                        "__QuestName": "Anomaly Research: Aurora Somnacanth"
                    }
                ]
            },
            "Icon": 54
        },
        "350": {
            "Id": 350,
            "Name": "Pyre Rakna-Kadaki",
            "MapIds": [
                5,
                13
            ],
            "QuestType": [
                1
            ],
            "TargetTypes": [
                2
            ],
            "OrderType": 16,
            "QuestLevel": 3,
            "EnemyDataList": {
                "0": [
                    {
                        "_RouteNo": 10,
                        "_PartsTbl": 137,
                        "_InitSetName": "\u30e1\u30a4\u30f3",
                        "_SubType": 0,
                        "_VitalTbl": 123,
                        "_AttackTbl": 118,
                        "_OtherTbl": 135,
                        "_StaminaTbl": 3,
                        "_Scale": 100,
                        "_ScaleTbl": 6,
                        "_Difficulty": 2,
                        "_BossMulti": 16,
                        "_IndividualType": 0,
                        "__QuestName": "A Mighty Need"
                    },
                    {
                        "_RouteNo": 10,
                        "_PartsTbl": 137,
                        "_InitSetName": "\u30e1\u30a4\u30f3",
                        "_SubType": 0,
                        "_VitalTbl": 123,
                        "_AttackTbl": 118,
                        "_OtherTbl": 135,
                        "_StaminaTbl": 3,
                        "_Scale": 100,
                        "_ScaleTbl": 6,
                        "_Difficulty": 2,
                        "_BossMulti": 16,
                        "_IndividualType": 0,
                        "__QuestName": "Operation Pyre Rakna-Kadaki"
                    }
                ],
                "1": []
            },
            "Icon": 55
        },
        "351": {
            "Id": 351,
            "Name": "Magma Almudron",
            "MapIds": [
                5
            ],
            "QuestType": [
                1
            ],
            "TargetTypes": [
                2
            ],
            "OrderType": 16,
            "QuestLevel": 3,
            "EnemyDataList": {
                "0": [
                    {
                        "_RouteNo": 10,
                        "_PartsTbl": 137,
                        "_InitSetName": "\u30e1\u30a4\u30f3",
                        "_SubType": 0,
                        "_VitalTbl": 123,
                        "_AttackTbl": 118,
                        "_OtherTbl": 135,
                        "_StaminaTbl": 3,
                        "_Scale": 100,
                        "_ScaleTbl": 6,
                        "_Difficulty": 2,
                        "_BossMulti": 16,
                        "_IndividualType": 0,
                        "__QuestName": "Hot Mud in Your Eye"
                    }
                ],
                "1": []
            },
            "Icon": 56
        },
        "1303": {
            "Id": 1303,
            "Name": "Furious Rajang",
            "MapIds": [
                4,
                1,
                2,
                12,
                3,
                13,
                5
            ],
            "QuestType": [
                1
            ],
            "TargetTypes": [
                2
            ],
            "OrderType": 22,
            "QuestLevel": 5,
            "EnemyDataList": {
                "0": [
                    {
                        "_RouteNo": 10,
                        "_PartsTbl": 153,
                        "_InitSetName": "\u30e1\u30a4\u30f3",
                        "_SubType": 0,
                        "_VitalTbl": 138,
                        "_AttackTbl": 127,
                        "_OtherTbl": 137,
                        "_StaminaTbl": 3,
                        "_Scale": 100,
                        "_ScaleTbl": 11,
                        "_Difficulty": 2,
                        "_BossMulti": 16,
                        "_IndividualType": 0,
                        "__QuestName": "Pierce the Heavens"
                    },
                    {
                        "_RouteNo": 10,
                        "_PartsTbl": 149,
                        "_InitSetName": "\u30e1\u30a4\u30f3",
                        "_SubType": 0,
                        "_VitalTbl": 134,
                        "_AttackTbl": 123,
                        "_OtherTbl": 137,
                        "_StaminaTbl": 3,
                        "_Scale": 100,
                        "_ScaleTbl": 11,
                        "_Difficulty": 2,
                        "_BossMulti": 16,
                        "_IndividualType": 0,
                        "__QuestName": "Unreasonable Rage"
                    },
                    {
                        "_RouteNo": 10,
                        "_PartsTbl": 149,
                        "_InitSetName": "\u30e1\u30a4\u30f3",
                        "_SubType": 0,
                        "_VitalTbl": 134,
                        "_AttackTbl": 123,
                        "_OtherTbl": 137,
                        "_StaminaTbl": 3,
                        "_Scale": 100,
                        "_ScaleTbl": 11,
                        "_Difficulty": 2,
                        "_BossMulti": 16,
                        "_IndividualType": 0,
                        "__QuestName": "Unreasonable Rage"
                    },
                    {
                        "_RouteNo": 10,
                        "_PartsTbl": 149,
                        "_InitSetName": "\u30e1\u30a4\u30f3",
                        "_SubType": 0,
                        "_VitalTbl": 134,
                        "_AttackTbl": 123,
                        "_OtherTbl": 137,
                        "_StaminaTbl": 3,
                        "_Scale": 100,
                        "_ScaleTbl": 11,
                        "_Difficulty": 2,
                        "_BossMulti": 16,
                        "_IndividualType": 0,
                        "__QuestName": "Unreasonable Rage"
                    },
                    {
                        "_RouteNo": 10,
                        "_PartsTbl": 149,
                        "_InitSetName": "\u30e1\u30a4\u30f3",
                        "_SubType": 0,
                        "_VitalTbl": 134,
                        "_AttackTbl": 123,
                        "_OtherTbl": 137,
                        "_StaminaTbl": 3,
                        "_Scale": 100,
                        "_ScaleTbl": 11,
                        "_Difficulty": 2,
                        "_BossMulti": 16,
                        "_IndividualType": 0,
                        "__QuestName": "Unreasonable Rage"
                    },
                    {
                        "_RouteNo": 10,
                        "_PartsTbl": 149,
                        "_InitSetName": "\u30e1\u30a4\u30f3",
                        "_SubType": 0,
                        "_VitalTbl": 134,
                        "_AttackTbl": 123,
                        "_OtherTbl": 137,
                        "_StaminaTbl": 3,
                        "_Scale": 100,
                        "_ScaleTbl": 11,
                        "_Difficulty": 2,
                        "_BossMulti": 16,
                        "_IndividualType": 0,
                        "__QuestName": "Unreasonable Rage"
                    },
                    {
                        "_RouteNo": 10,
                        "_PartsTbl": 149,
                        "_InitSetName": "\u30e1\u30a4\u30f3",
                        "_SubType": 0,
                        "_VitalTbl": 134,
                        "_AttackTbl": 123,
                        "_OtherTbl": 137,
                        "_StaminaTbl": 3,
                        "_Scale": 100,
                        "_ScaleTbl": 11,
                        "_Difficulty": 2,
                        "_BossMulti": 16,
                        "_IndividualType": 0,
                        "__QuestName": "Unreasonable Rage"
                    },
                    {
                        "_RouteNo": 10,
                        "_PartsTbl": 149,
                        "_InitSetName": "\u30e1\u30a4\u30f3",
                        "_SubType": 0,
                        "_VitalTbl": 134,
                        "_AttackTbl": 123,
                        "_OtherTbl": 137,
                        "_StaminaTbl": 3,
                        "_Scale": 100,
                        "_ScaleTbl": 11,
                        "_Difficulty": 2,
                        "_BossMulti": 16,
                        "_IndividualType": 0,
                        "__QuestName": "Operation Furious Golden Fur"
                    },
                    {
                        "_RouteNo": 10,
                        "_PartsTbl": 149,
                        "_InitSetName": "\u30e1\u30a4\u30f3",
                        "_SubType": 0,
                        "_VitalTbl": 134,
                        "_AttackTbl": 123,
                        "_OtherTbl": 137,
                        "_StaminaTbl": 3,
                        "_Scale": 100,
                        "_ScaleTbl": 11,
                        "_Difficulty": 2,
                        "_BossMulti": 16,
                        "_IndividualType": 0,
                        "__QuestName": "Rage That Never Dies"
                    }
                ],
                "1": []
            },
            "Icon": 45
        },
        "1366": {
            "Id": 1366,
            "Name": "Crimson Glow Valstrax",
            "MapIds": [
                1,
                4,
                5,
                2,
                3,
                13,
                12
            ],
            "QuestType": [
                2
            ],
            "TargetTypes": [
                3
            ],
            "OrderType": 22,
            "QuestLevel": 5,
            "EnemyDataList": {
                "0": [
                    {
                        "_RouteNo": 10,
                        "_PartsTbl": 153,
                        "_InitSetName": "\u30e1\u30a4\u30f3",
                        "_SubType": 0,
                        "_VitalTbl": 138,
                        "_AttackTbl": 123,
                        "_OtherTbl": 137,
                        "_StaminaTbl": 3,
                        "_Scale": 100,
                        "_ScaleTbl": 20,
                        "_Difficulty": 2,
                        "_BossMulti": 16,
                        "_IndividualType": 0,
                        "__QuestName": "Star at Worlds End"
                    },
                    {
                        "_RouteNo": 10,
                        "_PartsTbl": 149,
                        "_InitSetName": "\u30e1\u30a4\u30f3",
                        "_SubType": 0,
                        "_VitalTbl": 134,
                        "_AttackTbl": 123,
                        "_OtherTbl": 137,
                        "_StaminaTbl": 3,
                        "_Scale": 100,
                        "_ScaleTbl": 20,
                        "_Difficulty": 2,
                        "_BossMulti": 16,
                        "_IndividualType": 0,
                        "__QuestName": "Mysterious Glow"
                    },
                    {
                        "_RouteNo": 10,
                        "_PartsTbl": 149,
                        "_InitSetName": "\u30e1\u30a4\u30f3",
                        "_SubType": 0,
                        "_VitalTbl": 134,
                        "_AttackTbl": 123,
                        "_OtherTbl": 137,
                        "_StaminaTbl": 3,
                        "_Scale": 100,
                        "_ScaleTbl": 20,
                        "_Difficulty": 2,
                        "_BossMulti": 16,
                        "_IndividualType": 0,
                        "__QuestName": "Mysterious Glow"
                    },
                    {
                        "_RouteNo": 10,
                        "_PartsTbl": 149,
                        "_InitSetName": "\u30e1\u30a4\u30f3",
                        "_SubType": 0,
                        "_VitalTbl": 134,
                        "_AttackTbl": 123,
                        "_OtherTbl": 137,
                        "_StaminaTbl": 3,
                        "_Scale": 100,
                        "_ScaleTbl": 20,
                        "_Difficulty": 2,
                        "_BossMulti": 16,
                        "_IndividualType": 0,
                        "__QuestName": "Mysterious Glow"
                    },
                    {
                        "_RouteNo": 10,
                        "_PartsTbl": 149,
                        "_InitSetName": "\u30e1\u30a4\u30f3",
                        "_SubType": 0,
                        "_VitalTbl": 134,
                        "_AttackTbl": 123,
                        "_OtherTbl": 137,
                        "_StaminaTbl": 3,
                        "_Scale": 100,
                        "_ScaleTbl": 20,
                        "_Difficulty": 2,
                        "_BossMulti": 16,
                        "_IndividualType": 0,
                        "__QuestName": "Mysterious Glow"
                    },
                    {
                        "_RouteNo": 10,
                        "_PartsTbl": 149,
                        "_InitSetName": "\u30e1\u30a4\u30f3",
                        "_SubType": 0,
                        "_VitalTbl": 134,
                        "_AttackTbl": 123,
                        "_OtherTbl": 137,
                        "_StaminaTbl": 3,
                        "_Scale": 100,
                        "_ScaleTbl": 20,
                        "_Difficulty": 2,
                        "_BossMulti": 16,
                        "_IndividualType": 0,
                        "__QuestName": "Mysterious Glow"
                    },
                    {
                        "_RouteNo": 10,
                        "_PartsTbl": 149,
                        "_InitSetName": "\u30e1\u30a4\u30f3",
                        "_SubType": 0,
                        "_VitalTbl": 134,
                        "_AttackTbl": 123,
                        "_OtherTbl": 137,
                        "_StaminaTbl": 3,
                        "_Scale": 100,
                        "_ScaleTbl": 20,
                        "_Difficulty": 2,
                        "_BossMulti": 16,
                        "_IndividualType": 0,
                        "__QuestName": "Mysterious Glow"
                    },
                    {
                        "_RouteNo": 10,
                        "_PartsTbl": 149,
                        "_InitSetName": "\u30e1\u30a4\u30f3",
                        "_SubType": 0,
                        "_VitalTbl": 134,
                        "_AttackTbl": 123,
                        "_OtherTbl": 137,
                        "_StaminaTbl": 3,
                        "_Scale": 100,
                        "_ScaleTbl": 20,
                        "_Difficulty": 2,
                        "_BossMulti": 16,
                        "_IndividualType": 0,
                        "__QuestName": "Operation Jungle Comet"
                    }
                ],
                "1": []
            },
            "Icon": 21
        },
        "1369": {
            "Id": 1369,
            "Name": "Scorned Magnamalo",
            "MapIds": [
                13,
                1
            ],
            "QuestType": [
                1
            ],
            "TargetTypes": [
                2
            ],
            "OrderType": 22,
            "QuestLevel": 5,
            "EnemyDataList": {
                "0": [
                    {
                        "_RouteNo": 10,
                        "_PartsTbl": 153,
                        "_InitSetName": "\u30e1\u30a4\u30f3",
                        "_SubType": 0,
                        "_VitalTbl": 138,
                        "_AttackTbl": 130,
                        "_OtherTbl": 137,
                        "_StaminaTbl": 3,
                        "_Scale": 100,
                        "_ScaleTbl": 20,
                        "_Difficulty": 2,
                        "_BossMulti": 16,
                        "_IndividualType": 0,
                        "__QuestName": "Back with a Vengeance"
                    },
                    {
                        "_RouteNo": 10,
                        "_PartsTbl": 149,
                        "_InitSetName": "\u30e1\u30a4\u30f3",
                        "_SubType": 0,
                        "_VitalTbl": 134,
                        "_AttackTbl": 123,
                        "_OtherTbl": 137,
                        "_StaminaTbl": 3,
                        "_Scale": 100,
                        "_ScaleTbl": 20,
                        "_Difficulty": 2,
                        "_BossMulti": 16,
                        "_IndividualType": 0,
                        "__QuestName": "Operation Wrath"
                    }
                ],
                "1": []
            },
            "Icon": 52
        },
        "1379": {
            "Id": 1379,
            "Name": "Narwa the Allmother",
            "MapIds": [],
            "QuestType": [],
            "TargetTypes": [],
            "OrderType": 99,
            "QuestLevel": 10,
            "EnemyDataList": {
                "0": [],
                "1": []
            },
            "Icon": 40
        },
        "1793": {
            "Id": 1793,
            "Name": "Apex Rathian",
            "MapIds": [
                3,
                1,
                5
            ],
            "QuestType": [],
            "TargetTypes": [],
            "OrderType": 99,
            "QuestLevel": 10,
            "EnemyDataList": {
                "0": [],
                "1": []
            },
            "Icon": 65
        },
        "1794": {
            "Id": 1794,
            "Name": "Apex Rathalos",
            "MapIds": [
                5,
                1
            ],
            "QuestType": [],
            "TargetTypes": [],
            "OrderType": 99,
            "QuestLevel": 10,
            "EnemyDataList": {
                "0": [],
                "1": []
            },
            "Icon": 66
        },
        "1799": {
            "Id": 1799,
            "Name": "Apex Diablos",
            "MapIds": [
                2
            ],
            "QuestType": [],
            "TargetTypes": [],
            "OrderType": 99,
            "QuestLevel": 10,
            "EnemyDataList": {
                "0": [],
                "1": []
            },
            "Icon": 67
        },
        "1849": {
            "Id": 1849,
            "Name": "Apex Zinogre",
            "MapIds": [
                1,
                3
            ],
            "QuestType": [],
            "TargetTypes": [],
            "OrderType": 99,
            "QuestLevel": 10,
            "EnemyDataList": {
                "0": [],
                "1": []
            },
            "Icon": 68
        },
        "1852": {
            "Id": 1852,
            "Name": "Apex Arzuros",
            "MapIds": [
                1,
                3
            ],
            "QuestType": [],
            "TargetTypes": [],
            "OrderType": 99,
            "QuestLevel": 10,
            "EnemyDataList": {
                "0": [],
                "1": []
            },
            "Icon": 69
        },
        "1874": {
            "Id": 1874,
            "Name": "Apex Mizutsune",
            "MapIds": [
                4,
                3,
                1
            ],
            "QuestType": [],
            "TargetTypes": [],
            "OrderType": 99,
            "QuestLevel": 10,
            "EnemyDataList": {
                "0": [],
                "1": []
            },
            "Icon": 70
        }
    },
    "Maps": {
        "1": {
            "EmsSetNo": [
                2,
                1,
                29,
                0,
                23,
                30,
                24,
                25,
                3,
                26,
                35,
                36
            ]
        },
        "2": {
            "EmsSetNo": [
                5,
                4,
                8,
                9,
                6,
                37,
                38,
                7
            ]
        },
        "3": {
            "EmsSetNo": [
                11,
                10,
                13,
                14,
                12,
                39,
                41,
                40,
                42
            ]
        },
        "4": {
            "EmsSetNo": [
                16,
                15,
                19,
                20,
                17,
                18
            ]
        },
        "5": {
            "EmsSetNo": [
                22,
                21,
                31,
                43,
                45,
                44,
                27,
                28
            ]
        },
        "12": {
            "EmsSetNo": [
                47,
                33,
                48,
                46
            ]
        },
        "13": {
            "EmsSetNo": [
                34,
                50,
                49,
                0
            ]
        }
    }
}