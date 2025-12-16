import { deleteLoginSession } from "@/lib/login/manage-login";
import { asyncDelay } from "@/utils/async-delay";
import { redirect } from "next/navigation";

export async function logoutAction() {
    await deleteLoginSession()
    redirect('/')
}