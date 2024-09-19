import tkinter as tk
from tkinter import ttk

# Main window
root = tk.Tk()
root.title("Howdy Scout")

# Get the screen width and height
screen_width = root.winfo_screenwidth()
screen_height = root.winfo_screenheight()
root.geometry(f"{screen_width}x{screen_height}")

# root.attributes("-fullscreen", True)
root.configure(bg="#5e5e5e")

# Configure grid layout for resizing
root.grid_rowconfigure(0, weight=1)
root.grid_columnconfigure(1, weight=1)


# Styling setup
style = ttk.Style()
style.configure("TButton", font=("Monospace", 10))
style.configure(
    "TLabel", font=("Monospace", 12), background="#2d2d2d", foreground="white"
)

# Frame setup (outer containers)
left_frame = tk.Frame(root, bg="#5e5e5e", width=200, height=768)
left_frame.grid(row=0, column=0, sticky="nswe")

right_frame = tk.Frame(root, bg="#5e5e5e", width=824, height=768)
right_frame.grid(row=0, column=1, sticky="nswe")

# Event Selection (left section)
event_select_frame = tk.Frame(left_frame, bg="#2d2d2d", height=100)
event_select_frame.pack(fill="x", pady=10)

event_select_label = ttk.Label(event_select_frame, text="Event")
event_select_label.pack(side="left", padx=10)

event_picker = ttk.Combobox(event_select_frame, values=["Event 1", "Event 2"])
event_picker.pack(fill="x", padx=10)

# Team List (left section)
team_list_frame = tk.Frame(left_frame, bg="#2d2d2d")
team_list_frame.pack(fill="both", expand=True, pady=10)

team_list_label = ttk.Label(team_list_frame, text="Team List")
team_list_label.pack(anchor="n", pady=10)

team_listbox = tk.Listbox(team_list_frame)
team_listbox.pack(fill="both", expand=True, padx=10, pady=10)

# Stat Graph (right section)
graph_frame = tk.Frame(right_frame, bg="#2d2d2d", height=400, width=500)
graph_frame.grid(row=0, column=0, sticky="nwe", padx=10, pady=10)

graph_label = ttk.Label(graph_frame, text="Stat Graph")
graph_label.pack(anchor="n", pady=10)

# Dropdown for stats
stat_picker = ttk.Combobox(graph_frame, values=["Stat 1", "Stat 2"])
stat_picker.pack(pady=10)

# Team API Stats (right section)
api_stats_frame = tk.Frame(right_frame, bg="#2d2d2d", width=300)
api_stats_frame.grid(row=0, column=1, padx=10, pady=10, sticky="ns")

api_stats_label = ttk.Label(api_stats_frame, text="Team API Stats")
api_stats_label.pack(anchor="n", pady=10)

# API Stats content
for stat in ["Name", "Number", "Rank", "OPR", "EPA"]:
    stat_frame = tk.Frame(api_stats_frame, bg="#2d2d2d")
    stat_frame.pack(fill="x", pady=5)
    stat_label = ttk.Label(stat_frame, text=f"{stat}:")
    stat_label.pack(side="left", padx=10)
    stat_value = ttk.Label(stat_frame, text="-")
    stat_value.pack(side="right", padx=10)

# Team Pictures (bottom section)
picture_frame = tk.Frame(right_frame, bg="#2d2d2d", height=300)
picture_frame.grid(row=1, column=0, columnspan=2, padx=10, pady=10)

picture_label = ttk.Label(picture_frame, text="Team Pictures")
picture_label.pack(anchor="n", pady=10)

# Placeholder for pictures (horizontal scroll)
canvas = tk.Canvas(picture_frame, bg="#2d2d2d")
scrollbar = tk.Scrollbar(picture_frame, orient="horizontal", command=canvas.xview)
scrollbar.pack(side="bottom", fill="x")
canvas.pack(fill="both", expand=True)
canvas.config(xscrollcommand=scrollbar.set)

# Adding images (use labels as placeholders)
image_frame = tk.Frame(canvas, bg="#2d2d2d")
canvas.create_window((0, 0), window=image_frame, anchor="nw")

for i in range(6):  # Placeholder images
    image_placeholder = ttk.Label(image_frame, text=f"Image {i+1}")
    image_placeholder.pack(side="left", padx=10, pady=10)

# Adjust canvas scroll region
image_frame.update_idletasks()
canvas.config(scrollregion=canvas.bbox("all"))

# Main loop
root.mainloop()
