# cloud_architecture

To test the backend endpoints in Postman, you can use the following JSON examples.

## Register a new user

```json
{
    "username":"johnny",
    "firstname":"john",
    "surname":"doe",
	"profilePic":"john_doe.jpg",
	"password":"johnpsw"
}
```

## Connect an account

```json
{
    "username":"johnny",
	"password":"johnpsw"
}
```

## Create a group

```json
{
    "name":"Super Group !"
}
```

## Invitation

```json
{
    "userId":1,
    "groupId":3
}
```

You can accept the invitation by connecting to the User with the Id 1 account.
## Accept an invitation

```json
{
    "groupId":3,
    "accept":"yes"
}
```

## Add a poll

```json
{
    "groupId":3,
    "name":"Star Wars: Revenge of Siths"
}
```

## Add part to List

```json
{
    "groupId":3,
    "name":"Sodas",
    "elements":["Coca-Cola","Fanta","Sprite"]
}
```

## Delete element from list

```json
{
    "groupId":3,
    "elements":"Sprite"
}
```

## Delete part from list

```json
{
    "groupId":3,
    "part":"Sodas"
}
```

## Vote

```json
{
    "groupId":3,
    "name":"Star Wars: Revenge of Siths"
}
```

## Change status

```json
{
    "groupId":3,
    "newAdminId":1
}
```

## Leave group

```json
{
    "groupId":3
}
```

## Delete account

```json
{
}
```