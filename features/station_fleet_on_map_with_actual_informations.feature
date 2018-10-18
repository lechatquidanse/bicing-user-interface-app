# The station fleet is composed by all the stations.
# Actual informations are the informations read as soon as the feature is requested by a user.
# Informations are composed of:
#  - the status ("OPENED" or "CLOSED")
#  - the availabilities (number of bike available and number of slot available).
#  - the location
# A user is an unauthenticated user.
Feature: User views actual informations about the station fleet on a map

    In order to choose a station to start or end my itinerary
    As a User
    I need to be able to view the actual informations of the station fleet

    Scenario: I can distinguish stations on map according to their status
        Given the fleet has "2" stations with status "OPEN"
        And the fleet has "5" stations with status "CLOSED"
        When I go to the "home" page
        Then I should see "2" stations with "red" marker on the map
        And I should see "5" stations with "grey" marker on the map
