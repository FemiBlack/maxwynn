export type MemeInput = {
  template_id: number;
  username: string;
  password: string;
  text0: string;
  text1: string;
  font?: string;
  max_font_size?: string;
  boxes?: [
    {
      text: string;
      x: number;
      y: number;
      width: number;
      height: number;
      color: string;
      outline_color: string;
    }
  ];
};

export type Meme = {
  id: string;
  name: string;
  url: string;
  width: number;
  height: number;
  box_count: number;
};

export type MemeResponse = {
  success: boolean;
  data: {
    memes: Meme[];
  };
};

export type CreateMemeResponse = {
  success: boolean;
  data?: {
    url: string;
    page_url: string;
  };
  error_message?: string;
};

export type AuthUser = {
  name: string;
  email: string;
  image: string;
  access_token: string;
  token_type: string;
  expires_at: number;
  expires_in: number;
  refresh_token: string;
  scope: string;
  id: string;
};

export type TimeRange = "short_term" | "medium_term" | "long_term";

type Enumerate<
  N extends number,
  Acc extends number[] = []
> = Acc["length"] extends N
  ? Acc[number]
  : Enumerate<N, [...Acc, Acc["length"]]>;

type IntRange<F extends number, T extends number> = Exclude<
  Enumerate<T>,
  Enumerate<F>
>;

export type Limit = IntRange<0, 50>;
