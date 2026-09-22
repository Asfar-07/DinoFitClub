import './profile.css';
import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from '@/features/user/userSlice';
import { updateProfilePicture } from '@/features/auth/authSlice.ts';
import { handleUser } from '@/features/user/userService';
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage, AvatarBadge } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import GeneralLoader from '@/components/Loader/GeneralLoader';
import Navbar from '@/components/Navbar/Navbar.tsx';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Pencil, Check, X, MapPin, Calendar, Phone, Mail,
  User, ShieldCheck, LayoutDashboard, Plus, SettingsIcon,
  Camera,
  Search
} from "lucide-react";
import ShortcutsCommand from '@/components/SmallUI/ShortcutsCommand';
import AvatarChanger from './AvatarChanger';
import CommandController from './CommandController';
import { formatDate, getDaysSinceCreated } from '@/utils/TimeHandle';
import { pickAvatar } from '@/utils/avatarHandle';

import type { AccountCommunitiesResponse, CommunitySummary } from './Profile.type';
import CommunityCard from './CommunityCards';
import { Skeleton } from '@/components/ui/skeleton';

interface UserData {
  id: string;
  username: string;
  email: string;
  createdAt: string;
  about: string;
  address: string;
  available: boolean;
  avatar: string;
  dob: string;
  gender: string;
  phone_no: string;
  trainer: boolean;
  updateDate: string;
}

interface EditableFields {
  about: string;
  address: string;
  phone_no: string;
  gender: string;
}

function DiscoverTile({ icon, title, description, onClick }: {
  icon: React.ReactNode;
  title: string;
  description: string;
  onClick?: () => void;
}) {
  return (
    <button className="discover-card" onClick={onClick} type="button">
      <span className="discover-icon">{icon}</span>
      <span className="discover-title">{title}</span>
      <span className="discover-desc">{description}</span>
    </button>
  );
}

export default function ProfileDashboard() {
  const [userData, setUserData] = useState<UserData>({
    id: "",
    username: "",
    email: "",
    createdAt: "",
    about: "",
    address: "",
    available: true,
    avatar: "",
    dob: "",
    gender: "",
    phone_no: "",
    trainer: false,
    updateDate: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isChangeAvatarOpen, setIsChangeAvatarOpen] = useState(false);
  const [isLoadingCommunity, setIsLoadingCommunity] = useState(false);
  const [ownCommunity, setOwnCommunity] = useState<CommunitySummary[]>([]);
  const [followedCommunity, setFollowedCommunity] = useState<CommunitySummary[]>([]);
  const hasFetched = useRef(false);
  const [avatars, setAvatars] = useState<string[]>([]);
  let navigate = useNavigate();
  const dispatch = useDispatch();


  const { register, handleSubmit, reset, setValue, watch } = useForm<EditableFields>({
    defaultValues: {
      about: userData?.about,
      address: userData?.address,
      phone_no: userData?.phone_no,
      gender: userData?.gender,
    },
  });

  useEffect(() => {
    reset({ about: userData.about, address: userData.address, phone_no: userData.phone_no, gender: userData.gender });
  }, [userData, reset]);

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;
    setIsLoading(true);
    setIsLoadingCommunity(true);

    handleUser.fetchUser().then((data) => {
      setIsLoading(false);
      dispatch(addUser(data));
      setUserData(data);
      callDefaultAvatars();
      callCommunities();
    })
  }, [navigate, dispatch]);

  function callCommunities(){
    handleUser.getCommunities().then((communities: AccountCommunitiesResponse) => {
      setOwnCommunity(communities.owned);
      setFollowedCommunity(communities.followed);
    }).finally(() => {
      setIsLoadingCommunity(false);
    });
  }
  
  function callDefaultAvatars(){
    handleUser.getDefaultAvatars().then((avatars: string[]) => {
      setAvatars(avatars);
    })
  }

  const watchedGender = watch("gender");

  const onSubmit = (data: EditableFields) => {
    if (isLoading) return;
    setIsLoading(true);
    const updated = (Object.keys(data) as (keyof EditableFields)[]).reduce(
      (acc, key) => {
        if (data[key] !== userData[key]) acc[key] = data[key];
        return acc;
      },
      {} as Partial<EditableFields>
    );

    if (Object.keys(updated).length === 0) {
      setIsEditing(false);
      return; // nothing changed
    }

    handleUser.updateUser(updated).then(() => {
      setUserData((prev) => ({ ...prev, ...updated }));
      setIsEditing(false);
      dispatch(addUser(userData));
      setIsLoading(false);
    })
    .catch(() => {
      setIsLoading(false);
    });
  };

  const handleCancel = () => {
    reset({ about: userData.about, address: userData.address, phone_no: userData.phone_no, gender: userData.gender });
    setIsEditing(false);
  };


  const initials = userData?.username.split(" ").map((n) => n[0]).join("").toUpperCase();
  // const followingCards = cards.filter((c) => !c.isOwner);

  const heroStats = [
    { label: "G Coins", value: "128" },
    { label: "Streak", value: getDaysSinceCreated(userData.createdAt) + " days" },
    { label: "Own Community", value: String(ownCommunity.length) },
    { label: "Partners", value: "finding" },
  ];

  function SelectDefaultAvatar(src: string){
    if(!src || src.length <= 0) return;
    if(src === userData.avatar) return;

    handleUser.ChangeDefaultAvatar(src).then(() => {
      setUserData({...userData, avatar: src});
      dispatch(addUser(userData));
      setIsChangeAvatarOpen(false);
      dispatch(updateProfilePicture(src));

    }).catch((e) => {
      console.log(e.response.status);
    })
  }

  return (
    <div className="root-wrap relative min-h-screen w-full overflow-hidden p-4 md:p-8 max-md:pt-14">
      {isLoading && <GeneralLoader />}
      <Navbar />
      <AvatarChanger open={isChangeAvatarOpen} onClose={() => setIsChangeAvatarOpen(false)}
       onSelectDefault={(src) => {SelectDefaultAvatar(src)}}
       avatars={avatars} currentAvatar={userData.avatar}/>

      <div className="absolute -top-40 -left-40 h-[520px] w-[520px] rounded-full bg-[#5dbcc1]/30 blur-[140px]"></div>
      <div className="absolute top-1/2 -right-40 h-[520px] w-[520px] rounded-full bg-[#5dbcc1]/30 blur-[160px]"></div>
      <div className="absolute -bottom-40 -left-40 h-[520px] w-[520px] rounded-full bg-[#5dbcc1]/30 blur-[160px]"></div>

      <div className="max-w-7xl mx-auto pt-8 flex flex-col gap-6">

        {/* ══ Account hero ══ */}
        <div className="account-hero glass-strong-nav md:mt-18">
          <div>
            <span className="hero-eyebrow uppercase">Account</span>
            <h1 className="hero-title">Your <span>Big Community Here</span></h1>
            <p className="hero-desc">
              Your path is waiting here, make sure your booking.
            </p>
            <div className="stats-row">
              {heroStats.map((s) => (
                <div className="stat-pill" key={s.label}>
                  <span className="stat-value">{s.value}</span>
                  <span className="stat-label">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="hero-mascot">
            {/* <DinoMascot /> */}
          </div>
          <div className="pointer-events-none absolute -right-10 -top-16 h-56 w-56 rounded-full bg-[#5dbcc1]/50 blur-[80px]"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-start">

          {/* LEFT Profile */}
          <div className="lg:col-span-2">
            <div className="glass-strong-nav rounded-2xl p-6 flex flex-col gap-5">

              <div className="flex flex-col items-center gap-3 pt-1">
                <div className="relative">
                  <Avatar className=' relative size-30 cursor-pointer hover:scale-[1.05] hover:shadow-2xl 
                  transition-transform duration-150 delay-100 rounded-full'
                  onClick={()=> setIsChangeAvatarOpen(true)}>
                    <div className='absolute flex items-center opacity-0 justify-center inset-0 size-full bg-[#414040a6] backdrop-[100px] hover:opacity-100 transition-opacity duration-150 delay-100 rounded-full'>
                      <div className='size-1/3 flex items-center justify-center rounded-full bg-(--symbol-color)'>
                        <Camera className='text-black'/>
                      </div>
                    </div>
                    <AvatarImage src={pickAvatar(userData.avatar)} alt="avatar" />
                    <AvatarFallback>{initials}</AvatarFallback>
                    <AvatarBadge className="bg-green-600 dark:bg-green-800" />
                  </Avatar>
                  <span className="absolute bottom-[5%] right-[5%] w-5 h-5 rounded-full border-2 flex items-center justify-center"
                    style={{ background: "#34d399", borderColor: "var(--bg)" }} />
                </div>
                <div className="text-center">
                  <h1 className="user-name text-[22px]">{userData.username}</h1>
                  <p className="secondary-text text-xs mt-0.5">@{userData.username.toLowerCase().replace(/\s+/g, "")}</p>
                </div>
                <div className="flex items-center gap-2 flex-wrap justify-center">
                  <span className="online-badge"><span className="online-dot" />Online</span>
                  {userData.trainer && <span className="trainer-badge"><ShieldCheck size={11} />Trainer</span>}
                </div>
              </div>

              <Separator className="divider" />

              {/* Form */}
              <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3.5">
                <span className="sec-label">Profile Info</span>
                <p className='text-[16px]'>Certified strength coach helping lifters build sustainable, data-driven progress.</p>

                {/* About */}
                <div className="flex flex-col gap-1">
                  {isEditing && <label className="secondary-text text-xs font-medium">About</label>}
                  {isEditing
                    ? <textarea {...register("about")} className="ci w-full p-3 resize-none text-sm" rows={3} />
                    : <p className="primary-text text-sm leading-relaxed">{userData.about}</p>}
                </div>

                {/* Address */}
                <div className="info-row">
                  <MapPin size={14} className="symbol info-icon" />
                  <div className="flex-1">
                    <label className="secondary-text text-xs">Address</label>
                    {isEditing
                      ? <input {...register("address")} className="ci w-full mt-1 h-8.5 text-sm" />
                      : <p className="primary-text text-sm">{userData.address}</p>}
                  </div>
                </div>

                {/* Phone */}
                <div className="info-row">
                  <Phone size={14} className="symbol info-icon" />
                  <div className="flex-1">
                    <label className="secondary-text text-xs">Phone</label>
                    {isEditing
                      ? <input {...register("phone_no")} className="ci w-full mt-1 h-8.5 text-sm" />
                      : <p className="primary-text text-sm">{userData.phone_no}</p>}
                  </div>
                </div>

                {/* Gender — editable */}
                <div className="info-row">
                  <User size={14} className="symbol info-icon" />
                  <div className="flex-1">
                    <label className="secondary-text text-xs">Gender</label>
                    {isEditing
                      ? (
                        <Select value={watchedGender} onValueChange={(v) => setValue("gender", v)}>
                          <SelectTrigger className="sel-trigger mt-1 w-full">
                            <SelectValue placeholder="Select gender" />
                          </SelectTrigger>
                          <SelectContent className="sel-content">
                            {["Male", "Female", "Non-binary", "Prefer not to say"].map((g) => (
                              <SelectItem key={g} value={g} style={{ color: "var(--pt)", cursor: "pointer" }}>{g}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )
                      : <p className="primary-text text-sm">{userData.gender}</p>}
                  </div>
                </div>

                {/* Read-only */}
                <div className="info-row">
                  <Mail size={14} className="symbol info-icon" />
                  <div className="flex-1">
                    <label className="secondary-text text-xs">Email</label>
                    <p className="primary-text text-sm">{userData.email}</p>
                  </div>
                </div>
                <div className="info-row">
                  <Calendar size={14} className="symbol info-icon" />
                  <div className="flex-1">
                    <label className="secondary-text text-xs">Member Since</label>
                    <p className="primary-text text-sm">{formatDate(userData.createdAt)}</p>
                  </div>
                </div>

                {/* Available */}
                <div className="toggle-row mt-1">
                  <span className="primary-text text-sm font-medium">Available for work</span>
                  <Switch checked={userData.available} onCheckedChange={(v) => setUserData((p) => ({ ...p, available: v }))} />
                </div>

                {/* Edit / Save / Cancel */}
                {!isEditing
                  ? (
                    <Button type="button" onClick={() => setIsEditing(true)} className="btn-accent w-full h-10 mt-1 gap-2">
                      <Pencil size={13} /> Edit Details
                    </Button>
                  )
                  : (
                    <div className="flex gap-2 mt-1">
                      <Button type="submit" className="btn-accent flex-1 h-10 gap-2">
                        <Check size={13} /> Save
                      </Button>
                      <Button type="button" onClick={handleCancel} className="btn-danger flex-1 h-10 gap-2">
                        <X size={13} /> Cancel
                      </Button>
                    </div>
                  )}
              </form>
            </div>
          </div>

          {/* ══ RIGHT — Channels / Dashboards ══ */}
          <div className="lg:col-span-3 flex flex-col gap-5">

            {/* own Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <LayoutDashboard size={14} className="symbol" />
                <span className="sec-label">Owned Community</span>
              </div>
              <div className='flex justify-center items-center gap-3'>
                <span className="count-pill">{ownCommunity.length}</span>
                <ShortcutsCommand CommandItems={CommandController(setIsEditing)} CustomButton={
                  <Button className="setting-btn text-white flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-lg cursor-pointer">
                    <SettingsIcon size={13} /> Setting
                  </Button>} />
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <p className="sub-label">Created by you</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {isLoadingCommunity ?
                  <>
                    <Skeleton className='w-full h-50 bg-gray-500 dark:bg-gray-700 m-1' />
                    <Skeleton className='w-full h-50 bg-gray-500 dark:bg-gray-700 m-1' />
                  </>
                  :
                  <>
                    {ownCommunity.map((community) => (
                      <CommunityCard key={community.publicId} data={community} />
                    ))}
                    <DiscoverTile
                      icon={<Plus size={16} />}
                      title="Create new own community"
                      description="Start a new community for your athletes."
                      onClick={() => navigate("/create/community")}
                    />
                  </>
                }
              </div>
            </div>

            {/* Following Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <LayoutDashboard size={14} className="symbol" />
                <span className="sec-label">Followed Community</span>
              </div>
              <div className='flex justify-center items-center gap-3'>
                <span className="count-pill">{followedCommunity.length}</span>
              </div>
            </div>

            {/* Following */}
            <div className="flex flex-col gap-3">
              <p className="sub-label">Also following</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {isLoadingCommunity ?
                  <>
                    <Skeleton className='w-full h-50 bg-gray-500 dark:bg-gray-700 m-1' />
                    <Skeleton className='w-full h-50 bg-gray-500 dark:bg-gray-700 m-1' />
                  </>
                  :
                  <>
                    {followedCommunity.map((community) => (
                      <CommunityCard key={community.publicId} data={community} />
                    ))}
                    <DiscoverTile
                      icon={<Search size={20} />}
                      title="Exploret"
                      description="Explore our fitness universe."
                    />
                  </>
                }
              </div>
            </div>


            {/* Meta strip */}
            <div className="meta-strip glass-strong-nav">
              <div>
                <span className="secondary-text text-xs">User ID</span>
                <p className="primary-text text-xs font-mono mt-0.5 opacity-70">{userData.id}</p>
              </div>
              <div>
                <span className="secondary-text text-xs">Last Updated</span>
                <p className="primary-text text-xs mt-0.5">{userData.updateDate}</p>
              </div>
              <div>
                <span className="secondary-text text-xs">DOB</span>
                <p className="primary-text text-xs mt-0.5">{userData.dob}</p>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck size={13} style={{ color: userData.trainer ? "#a78bfa" : "var(--sym)" }} />
                <span className="secondary-text text-xs">{userData.trainer ? "Trainer account" : "Standard account"}</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}