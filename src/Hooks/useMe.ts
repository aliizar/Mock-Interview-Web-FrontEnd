import { useQuery } from "@tanstack/react-query";
import { getMe } from "../api/auth.api";
import { useAuthStore } from "../stores/auth.store";

export const useMe = () => {
  const token = useAuthStore((state) => state.token);

  return useQuery({
    queryKey: ["me"],
    queryFn: () => getMe(token!),
    enabled: !!token,
    retry: false,
  });
};
