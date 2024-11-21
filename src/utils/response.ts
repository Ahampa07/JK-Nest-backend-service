export interface IResponse {
  data: any;
  message: string;
  code: number;
}

export const success = (
  data: any,
  message: string,
  code: number,
) => {
  return { data, message, code };
};

export const failure = (
  data: any,
  message: string,
  code: number,
) => {
  return { data, message, code };
};
