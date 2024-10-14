package it.polito.queuemanagementsystem.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class QueueStatusDTO {
    private String serviceName;
    private int queueLength;
}
