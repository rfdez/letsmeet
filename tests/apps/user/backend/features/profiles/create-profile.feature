Feature: Create a new profile
  In order to have profiles in the platform
  As a user in the platform
  I want to create a profile

  Scenario: A valid profile does not exist
    Given I send a PUT request to "/profiles/ef8ac118-8d7f-49cc-abec-78e0d05af80a" with body:
    """
    {
      "name": "Pepe",
      "age": 23,
      "location": "Bilbao",
      "gender": "male"
    }
    """
    Then the response status code should be 201
    And the response should be empty

  Scenario: A invalid identifier profile
    Given I send a PUT request to "/profiles/00000000-0000-0000-0000-000000000000" with body:
    """
    {
      "name": "Pepe",
      "age": 23,
      "location": "Bilbao",
      "gender": "male"
    }
    """
    Then the response status code should be 400

  Scenario: A invalid profile age
    Given I send a PUT request to "/profiles/ef8ac118-8d7f-49cc-abec-78e0d05af80a" with body:
    """
    {
      "name": "Pepe",
      "age": 17,
      "location": "Bilbao",
      "gender": "male"
    }
    """
    Then the response status code should be 400
