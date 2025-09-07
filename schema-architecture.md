This Spring Boot application uses both MVC and REST controllers. Thymeleaf templates are used for the Admin and Doctor dashboards, while REST APIs serve all other modules. The application interacts with two databases—MySQL (for patient, doctor, appointment, and admin data) and MongoDB (for prescriptions). All controllers route requests through a common service layer, which in turn delegates to the appropriate repositories. MySQL uses JPA entities while MongoDB uses document models.

1. User accesses a dashboard or calls an API endpoint.
2. The action is routed to the appropriate Thymeleaf or REST controller.
3. The controller calls the service layer.
4. The service delegates to the correct repository to fetch data.
5. The repository returns the data for the service layer to process.
6. The services returns the desired result to the controller.
7. The controller responds serving a web page or an json response.