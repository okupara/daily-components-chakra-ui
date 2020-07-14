// Since the original definition is permissive
type StrictOmit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
type RangeSliderEventSource = "mouse" | "touch" | "keyboard"
