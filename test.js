const data = {'us-east':
    {
    "status": "ok",
    "region": "us-east",
    "roles": [
      "socket"
    ],
    "results": {
      "services": {
        "redis": true,
        "database": true
      },
      "stats": {
        "servers_count": 2,
        "online": 585,
        "session": 0,
        "server": {
          "active_connections": 592,
          "wait_time": 0,
          "workers": [
            [
              "requests:pageviews",
              {
                "wait_time": 0,
                "workers": 0,
                "waiting": 0,
                "idle": 0,
                "time_to_return": 0,
                "recently_blocked_keys": [],
                "top_keys": []
              }
            ],
            [
              "io",
              {
                "wait_time": 0,
                "workers": 328,
                "waiting": 0,
                "idle": 32,
                "time_to_return": 0,
                "recently_blocked_keys": [
                  [
                    "3FG7RD4yF6",
                    1,
                    "2024-09-01T08:09:00.475Z"
                  ]
                ],
                "top_keys": [
                  [
                    "rMccHqnmWV",
                    0.06338028169014084
                  ],
                  [
                    "3FG7RD4yF6",
                    0.28169014084507044
                  ],
                  [
                    "Bvy5aLQrQE",
                    0.05985915492957746
                  ],
                  [
                    "rSXw1Dkv6k",
                    0.1056338028169014
                  ],
                  [
                    "SebSvvGfYs",
                    0.0528169014084507
                  ]
                ]
              }
            ],
            [
              "requests:unsupported-users",
              {
                "wait_time": 0,
                "workers": 0,
                "waiting": 0,
                "idle": 0,
                "time_to_return": 0,
                "recently_blocked_keys": [],
                "top_keys": []
              }
            ],
            [
              "recording-workers",
              {
                "wait_time": 0,
                "workers": 2,
                "waiting": 0,
                "idle": 2,
                "time_to_return": 0,
                "recently_blocked_keys": [],
                "top_keys": []
              }
            ]
          ],
          "cpu_load": 0.03,
          "timers": 100
        }
      }
    },
    "strict": false,
    "server_issue": null
  },
  'eu-west':
  {
    "status": "ok",
    "region": "eu-west",
    "roles": [
      "socket"
    ],
    "results": {
      "services": {
        "redis": true,
        "database": true
      },
      "stats": {
        "servers_count": 2,
        "online": 877,
        "session": 0,
        "server": {
          "active_connections": 588,
          "wait_time": 1019,
          "workers": [
            [
              "requests:pageviews",
              {
                "wait_time": 0,
                "workers": 0,
                "waiting": 0,
                "idle": 0,
                "time_to_return": 0,
                "recently_blocked_keys": [],
                "top_keys": []
              }
            ],
            [
              "io",
              {
                "wait_time": 1019,
                "workers": 330,
                "waiting": 1,
                "idle": 32,
                "time_to_return": 0,
                "recently_blocked_keys": [
                  [
                    "ZrTi2CzEnj",
                    1,
                    "2024-09-01T07:42:47.904Z"
                  ]
                ],
                "top_keys": [
                  [
                    "3FG7RD4yF6",
                    0.19791666666666666
                  ],
                  [
                    "ZrTi2CzEnj",
                    0.1736111111111111
                  ],
                  [
                    "k3C7AAdW8o",
                    0.15625
                  ],
                  [
                    "rZxAi6fCTu",
                    0.06597222222222222
                  ],
                  [
                    "qPYBL4bhqo",
                    0.05555555555555555
                  ]
                ]
              }
            ],
            [
              "requests:unsupported-users",
              {
                "wait_time": 0,
                "workers": 0,
                "waiting": 0,
                "idle": 0,
                "time_to_return": 0,
                "recently_blocked_keys": [],
                "top_keys": []
              }
            ],
            [
              "recording-workers",
              {
                "wait_time": 0,
                "workers": 2,
                "waiting": 0,
                "idle": 2,
                "time_to_return": 0,
                "recently_blocked_keys": [],
                "top_keys": []
              }
            ]
          ],
          "cpu_load": 0.03,
          "timers": 100
        }
      }
    },
    "strict": false,
    "server_issue": null
  }
}

  Object.keys(data).map(region => (
    // console.log('region', data['region'])
    // console.log('status', data[region]['status'], 'for', region)
    console.log(data[region]?.results.services.redis)
  ))