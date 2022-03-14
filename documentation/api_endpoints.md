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
