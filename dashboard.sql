# Stats that the system will give

## The number of users with private stories

// select distinct username from users join stories on users.id = stories.users_id and is_public = false and username not in (select username from users join stories on users.id = stories.users_id and is_public = true) 

## The number of users that read stories but not posted any stories

## Number of users that have public stories

## The number of users that looked at shelter data


