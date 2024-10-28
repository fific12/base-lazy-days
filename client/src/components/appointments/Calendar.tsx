import {
  Box,
  Checkbox,
  Grid,
  Heading,
  HStack,
  IconButton,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import { TiArrowLeftThick, TiArrowRightThick } from "react-icons/ti";

import { DateBox } from "./DateBox";
import { useAppointments } from "./hooks/useAppointments";

import { UserAppointments } from "@/components/user/UserAppointments";

export function Calendar() {
  const currentDate = dayjs();

  const { appointments, monthYear, updateMonthYear, showAll, setShowAll } =
    useAppointments();

  return (
    <Box>
      <HStack mt={10} spacing={8} justify="center">
        <IconButton
          aria-label="previous month"
          onClick={() => updateMonthYear(-1)}
          icon={<TiArrowLeftThick />}
          isDisabled={monthYear.startDate < currentDate}
        />
        <Heading minW="40%" textAlign="center">
          {monthYear.monthName} {monthYear.year}
        </Heading>
        <IconButton
          aria-label="next month"
          onClick={() => updateMonthYear(1)}
          icon={<TiArrowRightThick />}
        />
        <Checkbox
          variant="flushed"
          width="48"
          position="absolute"
          right="10px"
          checked={!showAll}
          defaultChecked
          onChange={() => setShowAll((prevValue) => !prevValue)}
        >
          Only show available
        </Checkbox>
      </HStack>
      <Grid templateColumns="repeat(7, 1fr)" gap={4} my={5} mx={10}>
        {/* first day needs a grid column */}
        <DateBox
          date={1}
          gridColumn={monthYear.firstDOW + 1}
          appointments={appointments[1]}
        />
        {/* the rest of the days will follow */}
        {[...Array(monthYear.lastDate)].map((_, i) =>
          i > 0 ? (
            <DateBox key={i} date={i + 1} appointments={appointments[i + 1]} />
          ) : null
        )}
      </Grid>
      <UserAppointments />
    </Box>
  );
}

/*
// USING TAILWIND INSTEAD OF CHAKRA

import React from "react";
import dayjs from "dayjs";
import { TiArrowLeftThick, TiArrowRightThick } from "react-icons/ti";

import { DateBox } from "./DateBox";
import { useAppointments } from "./hooks/useAppointments";
import { UserAppointments } from "@/components/user/UserAppointments";

export function Calendar() {
  const currentDate = dayjs();

  const { appointments, monthYear, updateMonthYear, showAll, setShowAll } =
    useAppointments();

  return (
    <div className="mt-10 flex flex-col items-center">
      // {/* Navigation and Month Heading */
//       <div className="flex items-center justify-center space-x-8 relative">
//         {/* Previous Month Button */}
//         <button
//           onClick={() => updateMonthYear(-1)}
//           disabled={monthYear.startDate < currentDate}
//           className={`p-2 rounded-full hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed`}
//           aria-label="previous month"
//         >
//           <TiArrowLeftThick size={24} />
//         </button>

//         {/* Month and Year Heading */}
//         <h2 className="text-2xl font-semibold text-center min-w-[40%]">
//           {monthYear.monthName} {monthYear.year}
//         </h2>

//         {/* Next Month Button */}
//         <button
//           onClick={() => updateMonthYear(1)}
//           className="p-2 rounded-full hover:bg-gray-200"
//           aria-label="next month"
//         >
//           <TiArrowRightThick size={24} />
//         </button>

//         {/* Show Available Appointments Only Checkbox */}
//         <label className="absolute right-0 flex items-center space-x-2">
//           <input
//             type="checkbox"
//             checked={!showAll}
//             defaultChecked
//             onChange={() => setShowAll((prevValue) => !prevValue)}
//             className="form-checkbox text-blue-600"
//           />
//           <span>Only show available</span>
//         </label>
//       </div>

//       {/* Calendar Grid */}
//       <div className="grid grid-cols-7 gap-4 my-5 mx-10">
//         {/* First day of the month */}
//         <DateBox
//           date={1}
//           className={`col-start-${monthYear.firstDOW + 1}`}
//           appointments={appointments[1]}
//         />
//         {/* The rest of the days */}
//         {[...Array(monthYear.lastDate)].map((_, i) =>
//           i > 0 ? (
//             <DateBox key={i} date={i + 1} appointments={appointments[i + 1]} />
//           ) : null
//         )}
//       </div>

//       {/* User Appointments Component */}
//       <UserAppointments />
//     </div>
//   );
// }

// */
