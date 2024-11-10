Users

user_id (PK, UUID): Unique identifier for each user.
name (String): User’s full name.
username (String, Unique): Username chosen by the user.
email (String, Unique): Email address for account login.
password_hash (String): Hashed password for authentication.
profile_photo_url (String): Link to the user’s profile photo.
created_at (Timestamp): Date and time the user account was created.
last_login (Timestamp): Date and time of the last login.
google_auth (Boolean): If true, indicates Google authentication is enabled.


User_Profile

profile_id (PK, UUID): Unique identifier for each user profile.
user_id (FK -> Users.user_id): References the user.
job_title (String): Job title of the user.
bio (Text): Short biography or description of the user.
linkedin_url (String): Link to LinkedIn profile.
about_me (Text): Additional information about the user.
created_at (Timestamp): Date and time the profile was created.


Projects

project_id (PK, UUID): Unique identifier for each project.
user_id (FK -> Users.user_id): References the user who created the project.
project_name (String): Name of the project.
tagline (String): Short description of the project.
problem_statement (Text): The problem that the project aims to solve.
solution (Text): Description of the proposed solution.
target_audience (Text): Description of the intended audience.
uvp (Text): Unique Value Proposition for the project.
stage_of_development (String): Current stage (e.g., MVP, prototype).
revenue_model (String): Optional description of the revenue model.
market_size (String): Optional description of the target market size.
competitors (Text): Optional list of competitors.
achievements (Text): Optional achievements or milestones.
team (Text): Optional description of the team.
attachment_url (String): Link to any uploaded attachments for the project.
created_at (Timestamp): Date and time the project was created.
updated_at (Timestamp): Date and time of the last update.


Project_Engagement

engagement_id (PK, UUID): Unique identifier for each engagement metric.
project_id (FK -> Projects.project_id): References the project.
views (Integer): Count of how many times the project was viewed.
comments (Integer): Count of comments received.
likes (Integer): Count of likes on the project.
shares (Integer): Count of shares.
created_at (Timestamp): Date and time the engagement metrics were created.
updated_at (Timestamp): Date and time of the last update.


Comments

comment_id (PK, UUID): Unique identifier for each comment.
project_id (FK -> Projects.project_id): References the project.
user_id (FK -> Users.user_id): References the user who made the comment.
content (Text): Content of the comment.
created_at (Timestamp): Date and time the comment was posted.


Project_Attachments

attachment_id (PK, UUID): Unique identifier for each attachment.
project_id (FK -> Projects.project_id): References the project.
attachment_url (String): URL of the attachment.
uploaded_at (Timestamp): Date and time the attachment was uploaded.