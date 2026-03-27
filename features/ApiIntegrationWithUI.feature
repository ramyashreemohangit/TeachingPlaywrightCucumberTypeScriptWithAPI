Feature: Login via API

Scenario: Verify that application allows user to login via API and lands on article creation page

When the user logs in via API with valid credentials and creates an article
Then the article should be created successfully