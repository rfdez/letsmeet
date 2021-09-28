Feature: Obtain a profile details
  In order to show the profile details
  As a user with profile
  I want to see the profile details

  Scenario: A user with profile details
    Given I send a PUT request to "/profiles/ef8ac118-8d7f-49cc-abec-78e0d05af80a" with body:
    """
    {
      "name": "Pepe",
      "age": 23,
      "location": "Bilbao",
      "gender": "male"
    }
    """
    When I send a GET request to "/profiles/ef8ac118-8d7f-49cc-abec-78e0d05af80a"
    Then the response status code should be 200
    And the response content should be:
    """
    {
      "id": "ef8ac118-8d7f-49cc-abec-78e0d05af80a",
      "name": "Pepe",
      "age": 23,
      "location": "Bilbao",
      "gender": "male"
    }
    """
