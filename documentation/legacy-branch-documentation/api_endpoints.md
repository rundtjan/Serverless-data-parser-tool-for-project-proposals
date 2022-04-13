# Server endpoint description

## Get Available Slack Channels
**URL** : `/api/channels/`

**Method** : `GET`

**Auth required** : NO

**Permissions required** : None

### Success Response

**Code** : `200 OK`

**Content examples**

React service component makes api query for available channels and receives following list of channels.

```
[
    "general",
    "random",
    "channel_one"
]
```

### Error Response

Connection to Slack API fails.

**Code** : `500 Internal Server Error`

---

## Get Available Slack Users
**URL** : `/api/users/`

**Method** : `GET`

**Auth required** : NO

**Permissions required** : None

### Success Response

**Code** : `200 OK`

**Content examples**

React service component makes api query for available users and receives following list of user objects.

```
[
    {
        "id": "USLACKBOT",
        "real_name": "Slackbot",
        "username": "slackbot"
    },
    {
        "id": "U02U7N423WE",
        "real_name": "Real Name1",
        "username": "test_user1"
    },
    {
        "id": "U02UAB8HUKX",
        "real_name": "Real Name2",
        "username": "test_user2"
    }
]
```

### Error Response

Connection to Slack API fails.

**Code** : `500 Internal Server Error`

---

## Get Messages From Slack Channel
**URL** : `/api/data/`

**Method** : `POST`

**Data Params (all key:values optional)**  
    {  
    channel: 'channel_name',  
    user: '@username' or user: 'RealName',  
    hours: 24  
    }

**Auth required** : NO

**Permissions required** : None

### Success Response

**Code** : `200 OK`

**Content examples**

React service component makes api query with channel, user and time parameters producing following response.

```
{
    "messages": [        
        {
            "client_msg_id": "6e00d76e-0565-4356-b8f7-8fd80a8bd608",
            "type": "message",
            "text": "Eräs Oy projekti alkaa 01.04. budjetti 10.000€",
            "user": "U02UF7T2DN1",
            "ts": "1645463475.350089",
            "team": "T02UNV7V4GZ",
            "blocks": [...],
            "thread_ts": "1645463475.350089",
            "reply_count": 1,
            "reply_users_count": 1,
            "latest_reply": "1645463537.640819",
            "reply_users": [
                "U02UF7S2DK3"
            ],
            "is_locked": false,
            "subscribed": false,
            "thread_array": [
                {
                    "client_msg_id": "3480404c-8998-4af4-9023-2ca5cf339f8f",
                    "type": "message",
                    "text": "Tämä on siis Django REST api projekti.",
                    "user": "U02UF7S2DK3",
                    "ts": "1645463537.640819",
                    "team": "T02UNV7V4GZ",
                    "blocks": [...],
                    "thread_ts": "1645463475.350089",
                    "parent_user_id": "U02UF7T2DN1",
                    "real_name": "Test User",
                    "username": "test.user"
                }
            ],
            "real_name": "Test User",
            "username": "test.user"
        }
    ],
    "words": [
        {
            "word": "projekti",
            "message_ids": [
                "6e00d76e-0565-4356-b8f7-8fd80a8bd608",
                "3480404c-8998-4af4-9023-2ca5cf339f8f"
            ],
            "count": 2,
            "important": false,
            "category": ""
        },
        {
            "word": "11.03.2022",
            "message_ids": [
                "57d0baa2-49ca-4dad-8566-96c608fd8ff3"
            ],
            "count": 1,
            "important": false,
            "category": "Date"
        }
        //...
    ],
    "categories": [
        "Customer",
        "Price",
        "Deadline",
        "FTEs",
        "Contact",
        "Technology"
    ]
}
```

### Error Response

Connection to Slack API fails.

**Code** : `500 Internal Server Error`

---