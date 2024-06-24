
package com.ecom.entities;


import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import lombok.Data;
import jakarta.persistence.JoinColumn;


import java.util.Set;

@Entity
@Data
public class User {

    @Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long useId;
    private String userName;
    private String userFirstName;
    private String userLastName;
    private String userPassword;
    @ManyToMany
    (fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinTable(name = "USER_ROLE",
            joinColumns = {
                    @JoinColumn(name = "USER_ID")
            },
            inverseJoinColumns = {
                    @JoinColumn(name = "ROLE_ID")
            }
    )
    private Set<Role> role;
}
