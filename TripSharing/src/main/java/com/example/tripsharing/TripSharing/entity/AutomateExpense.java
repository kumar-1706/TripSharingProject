package com.example.tripsharing.TripSharing.entity;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@Entity
public class AutomateExpense {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String tripDetails;
    private String expenseCategory;
    private double amount;
    private int numberOfParticipants;
    private Long userId;
    @Transient
    private double amountPerParticipant;

    public AutomateExpense(String tripDetails, String expenseCategory, double amount, int numberOfParticipants, Long userId) {
        this.tripDetails = tripDetails;
        this.expenseCategory = expenseCategory;
        this.amount = amount;
        this.numberOfParticipants = numberOfParticipants;
        this.userId = userId;
        // Calculate amount per participant
        this.amountPerParticipant = amount / numberOfParticipants;
    }

}
