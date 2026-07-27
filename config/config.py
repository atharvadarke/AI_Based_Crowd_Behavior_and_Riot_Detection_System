import os
from dotenv import load_dotenv

load_dotenv()

# Project root directory (one level up from this config file)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# Directory where all model weight files live
MODELS_DIR = os.path.join(BASE_DIR, "models", "weights")

class Settings:
    BASE_DIR = BASE_DIR

    # =========================
    # CAMERA SETTINGS
    # =========================
    CAMERA_INDEX = 0
    VIDEO_SOURCE = None

    FRAME_WIDTH = 480
    FRAME_HEIGHT = 360


    # =========================
    # MODEL PATHS
    # =========================
    PEOPLE_MODEL = os.path.join(MODELS_DIR, "yolov8n.pt")
    WEAPON_MODEL = os.path.join(MODELS_DIR, "weapon.pt")
    GRU_MODEL    = os.path.join(MODELS_DIR, "best_gru_model.pth")

    # ML risk fusion model
    RISK_MODEL   = os.path.join(MODELS_DIR, "risk_model.pkl")


    # =========================
    # DETECTION CONFIDENCE & THRESHOLDS
    # =========================
    PERSON_CONF = 0.60
    PERSON_PERSISTENCE_THRESHOLD = 2

    WEAPON_CONF = 0.75
    WEAPON_ALERT_THRESHOLD = 0.55
    WEAPON_AREA_MIN = 120

    # =========================
    # MULTI-RATE PIPELINE
    # =========================
    # YOLO person detection (1 = every frame)
    PERSON_INTERVAL = 1

    # weapon model (heavy)
    WEAPON_INTERVAL = 2

    # EfficientNet sampling
    FEATURE_INTERVAL = 6

    # GRU temporal inference
    GRU_INTERVAL = 15


    # =========================
    # TEMPORAL BUFFER
    # =========================
    SEQUENCE_LENGTH = 30


    # =========================
    # TRAJECTORY ANALYSIS
    # =========================
    TRAJECTORY_HISTORY = 10


    # =========================
    # PERFORMANCE CONTROLS
    # =========================
    # maximum tracked people (prevents tracker overload)
    MAX_TRACKED_PEOPLE = 15

    # frame queue size
    FRAME_QUEUE_SIZE = 10

    # behavior queue size
    BEHAVIOR_QUEUE_SIZE = 5

    # number of behavior workers
    NUM_BEHAVIOR_WORKERS = 1


    # =========================
    # ALERT THRESHOLDS
    # =========================
    RIOT_THRESHOLD = 0.50
    EARLY_WARNING_THRESHOLD = 0.40
    ESCALATION_THRESHOLD = 0.04


    # =========================
    # ALERT SYSTEM
    # =========================
    ALERT_COOLDOWN = 5


    # =========================
    # CROWD NORMALIZATION
    # =========================
    MAX_EXPECTED_PEOPLE = 10


    # =========================
    # DEBUG VISUALIZATION
    # =========================
    SHOW_DEBUG_OVERLAY = False


    # =========================
    # LOGGING
    # =========================
    LOG_LEVEL = "INFO"
    LOG_FILE = os.path.join(BASE_DIR, "logs", "system.log")


    # =========================
    # EMAIL ALERTS
    # =========================
    ENABLE_EMAIL_ALERTS = True
    SMTP_SERVER = "smtp.gmail.com"
    SMTP_PORT = 465
    SMTP_USERNAME = os.getenv("SMTP_USERNAME", "arintalavadekar2223@ternaengg.ac.in")
    SMTP_PASSWORD = os.getenv("SMTP_PASSWORD", "")
    ALERT_EMAIL_SENDER = os.getenv("ALERT_EMAIL_SENDER", "arintalavadekar2223@ternaengg.ac.in")
    
    ALERT_EMAIL_RECIPIENT = [
        "ashwinipanada2223@ternaengg.ac.in",
        "maheepchopra2223@ternaengg.ac.in"
    ]

    # =========================
    # ADMIN CREDENTIALS
    # =========================
    ADMIN_USERNAME = "admin"
    ADMIN_PASSWORD = os.getenv("ADMIN_PASSWORD", "password123")


settings = Settings()
