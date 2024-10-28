import type { Staff } from "@shared/types";

export function filterByTreatment(
  staff: Staff[],
  treatmentName: string
): Staff[] {
  return staff.filter((person) =>
    person.treatmentNames
      .map((t) => t.toLowerCase())
      .includes(treatmentName.toLowerCase())
  );
}

// Normal JavaScript
// export function filterByTreatment(staff, treatmentName) {
//   return staff.filter((person) =>
//     person.treatmentNames
//       .map((t) => t.toLowerCase())
//       .includes(treatmentName.toLowerCase())
//   );
// }

// ALSO
// export function filterByTreatment(staffList, treatmentName) {
//   // Convert treatmentName to lowercase for case-insensitive comparison
//   const lowerCaseTreatment = treatmentName.toLowerCase();

//   // Filter through each staff member
//   return staffList.filter((staffMember) => {
//     // Convert each treatment name for the staff member to lowercase
//     const lowerCaseTreatments = staffMember.treatmentNames.map((name) =>
//       name.toLowerCase()
//     );

//     // Check if the treatment name exists in the staff member's list of treatments
//     return lowerCaseTreatments.includes(lowerCaseTreatment);
//   });
// }
