import type { role } from "@prisma/client";

export function getReadableRole(role: role) {
  switch (role) {
    case "admin": {
      return "관리자";
    }
    case "member": {
      return "회원";
    }
  }
}
