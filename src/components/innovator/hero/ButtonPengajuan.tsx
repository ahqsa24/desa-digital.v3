import React from "react";
import Button from "Components/button";
import { FaPaperPlane } from "react-icons/fa";
import { useRouter } from "next/navigation";
import Send from "@public/icons/send.svg";
import { Icon } from "./_heroStyle"

interface ButtonPengajuanProps {
  label: string;
  to?: string;
  onClick?: () => void;
  icon?: React.ElementType;
}

const ButtonPengajuan: React.FC<ButtonPengajuanProps> = ({ label, to, onClick, icon = FaPaperPlane }) => {
  const router = useRouter();

  const handleClick = () => {
    if (to) {
      router.push(to); // Navigasi ke halaman tujuan
    }
    if (onClick) {
      onClick(); // Panggil fungsi tambahan jika ada
    }
  };

  return (
    <Button
      size={'xs'}
      onClick={handleClick}
    >
      <Icon src={Send} alt="send" />
      {label} {/* Teks tombol */}
    </Button>
  );
};

export default ButtonPengajuan;