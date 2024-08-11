Feature: E2E e-commerce validation

Scenario: Ecommerce products delivery
Given I open ecommerce page
When I add items to cart
And validate the total prices
Then select the country submit and verify thankyou message

Scenario: Filling teh form to shop
Given I open ecommerce page
When I fill form details
Then validate the forms behaviour
And select the shop page