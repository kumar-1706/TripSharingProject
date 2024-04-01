package com.example.tripsharing.TripSharing.entity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.CascadeType;


@Entity
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class TravelPartner {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String email;
    private String travellingPlan;
    private Long userId;
    private Long tripId;



    //    @ManyToOne(fetch = FetchType.EAGER)
//    @JoinColumn(name = "trip_id")
//    private TripManagement trip;
//
//    @ManyToOne(fetch = FetchType.EAGER)
//    @JoinColumn(name = "user_id")
//    private User user;



    public void setTravellingPlanFromTrip(TripManagement trip) {
        if (trip != null) {
            this.travellingPlan = trip.getStartingPlace() + " to " + trip.getEndingPlace() +
                    ", " + trip.getStartDate() + " to " + trip.getEndDate();
        }
    }
    // Getters and setters
}

