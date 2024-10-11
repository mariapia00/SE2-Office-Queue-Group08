CREATE DATABASE oqms;

INSERT INTO Service( serviceName
                   , averageServiceTime
                   , queueLength
                   , lastTicketNumber) VALUES
                   ( 'Package Delivering'
                   , 15
                   , 0
                   , 0
                   ),
                   ( 'Tax Payment'
                   , 20
                   , 0
                   , 0
                   ),
                   ( 'PA Payment'
                   , 15
                   , 0
                   , 0
                   ),
                   ( 'Bank Services'
                   , 30
                   , 0
                   , 0
                   ),
                   ( 'Passport'
                   , 30
                   , 0
                   , 0
                   ),
                   ( 'Phone Services'
                   , 10
                   , 0
                   , 0
                   );

INSERT INTO Counter (counterID) VALUES (DEFAULT)
                                     , (DEFAULT)
                                     , (DEFAULT) ;

INSERT INTO CounterService (serviceId, counterId) VALUES ( 1
                                                         , 1
                                                         ),
                                                         ( 2
                                                         , 2
                                                         ),
                                                         ( 3
                                                         , 3
                                                         ),
                                                         ( 4
                                                         , 1
                                                         ),
                                                         ( 5
                                                         , 2
                                                         ),
                                                         ( 6
                                                         , 2
                                                         ),
                                                         ( 4
                                                         , 3
                                                         ),
                                                         ( 5
                                                         , 1
                                                         ),
                                                         ( 2
                                                         , 3
                                                         );



