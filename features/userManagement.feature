@userManagement
Feature: Login

Scenario: User should be able to login successful

Given user navigates to the application
When user logs in
Then logout link should be visible

When user clicks on "Admin" menu
 And user searches for an existing employee
Then searched employee should be visible in the search result under "Username" column