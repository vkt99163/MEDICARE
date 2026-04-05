import express from "express";
import {clerkMiddleware, requireAuth} from "@clerk/express";

import { cancelServiceAppointment, confirmServicePayment,createServiceAppointment,getServiceAppointmentById,getServiceAppointmentByPatient,getServiceAppointments,getServiceAppointmentStats } from "../controllers/serviceAppointmentController.js";
import { updateAppointment } from "../controllers/appointmentController.js";

const serviceAppointementRouter= express.Router();

serviceAppointementRouter.get("/", getServiceAppointments);
serviceAppointementRouter.get("/confirm",confirmServicePayment);
serviceAppointementRouter.get("/stats/summary", getServiceAppointmentStats);

serviceAppointementRouter.post("/", clerkMiddleware(),requireAuth(),createServiceAppointment);

serviceAppointementRouter.get("/me", clerkMiddleware(),requireAuth(), getServiceAppointmentByPatient)

serviceAppointementRouter.get("/:id", getServiceAppointmentById);
serviceAppointementRouter.put("/:id",updateAppointment);
serviceAppointementRouter.post("/:id/cancel",cancelServiceAppointment);

export default serviceAppointementRouter;