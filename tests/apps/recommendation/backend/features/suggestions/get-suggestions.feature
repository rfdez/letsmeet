Feature: Obtain profiles suggestion
  In order to have suggestions
  As a user with profile
  I want to see personal suggestions

  Scenario: With a profile in specific location
    Given The following event is received:
    """
    {
      "data": {
        "id": "c77fa036-cbc7-4414-996b-c6a7a93cae09",
        "type": "profile.created",
        "occurred_on": "2021-09-26T08:37:32+00:00",
        "attributes": {
          "id": "8c900b20-e04a-4777-9183-32faab6d2fb5",
          "name": "Pepe",
          "age": 23,
          "location": "Bilbao",
          "gender": "male"
        },
        "meta" : {
          "host": "111.26.06.93"
        }
      }
    }
    """

    And The following event is received:
    """
    {
      "data": {
        "id": "c77fa036-cbc7-4414-996b-c6a7a93cae10",
        "type": "profile.created",
        "occurred_on": "2021-09-26T08:37:32+00:00",
        "attributes": {
          "id": "8c900b20-e04a-4777-9183-32faab6d2fb6",
          "name": "Pepa",
          "age": 23,
          "location": "Valencia",
          "gender": "female"
        },
        "meta" : {
          "host": "111.26.06.93"
        }
      }
    }
    """

    And The following event is received:
    """
    {
      "data": {
        "id": "c77fa036-cbc7-4414-996b-c6a7a93cae11",
        "type": "profile.created",
        "occurred_on": "2021-09-26T08:37:32+00:00",
        "attributes": {
          "id": "8c900b20-e04a-4777-9183-32faab6d2fb7",
          "name": "Juan",
          "age": 23,
          "location": "Bilbao",
          "gender": "other"
        },
        "meta" : {
          "host": "111.26.06.93"
        }
      }
    }
    """

    And The following event is received:
    """
    {
      "data": {
        "id": "c77fa036-cbc7-4414-996b-c6a7a93cae12",
        "type": "profile.created",
        "occurred_on": "2021-09-26T08:37:32+00:00",
        "attributes": {
          "id": "8c900b20-e04a-4777-9183-32faab6d2fb8",
          "name": "Antonio",
          "age": 23,
          "location": "Sevilla",
          "gender": "male"
        },
        "meta" : {
          "host": "111.26.06.93"
        }
      }
    }
    """

    And The following event is received:
    """
    {
      "data": {
        "id": "c77fa036-cbc7-4414-996b-c6a7a93cae13",
        "type": "profile.created",
        "occurred_on": "2021-09-26T08:37:32+00:00",
        "attributes": {
          "id": "8c900b20-e04a-4777-9183-32faab6d2fb9",
          "name": "Luna",
          "age": 23,
          "location": "Bilbao",
          "gender": "transgender"
        },
        "meta" : {
          "host": "111.26.06.93"
        }
      }
    }
    """

    When I send a GET request to "/suggestions?filters[0][value]=bilbao&filters[0][operator]==&filters[0][field]=location&filters[1][value]=8c900b20-e04a-4777-9183-32faab6d2fb5&filters[1][operator]=!=&filters[1][field]=id"
    Then the response status code should be 200
    And the response should be:
    """
    [
      {
        "id": "8c900b20-e04a-4777-9183-32faab6d2fb7"
      },
      {
        "id": "8c900b20-e04a-4777-9183-32faab6d2fb9"
      }
    ]
    """
