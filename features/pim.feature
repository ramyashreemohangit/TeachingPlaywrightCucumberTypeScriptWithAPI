Feature: PIM

Scenario: User should be able to successfully add a new employee

Given user navigates to the application
When user logs in
Then logout link should be visible

When user clicks on "PIM" menu
 And user adds an employee
Then new employee details should be added to the application

When user enters their personal details
 And user clicks on "Save" button
Then personal details of employee should be saved in the application