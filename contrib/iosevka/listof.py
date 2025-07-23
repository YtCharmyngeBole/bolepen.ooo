import argparse
from fontTools.ttLib import TTFont

def list_opentype_features(woff2_path):
    """
    Lists OpenType features (GSUB and GPOS) of a WOFF2 font.

    Args:
        woff2_path (str): The path to the WOFF2 font file.
    """
    try:
        # Attempt to open the font file
        font = TTFont(woff2_path)

        print(f"--- OpenType Features for: {woff2_path} ---")

        # Check for and list GSUB (Glyph Substitution) features
        if 'GSUB' in font:
            print("\nGSUB (Glyph Substitution) Features:")
            gsub_table = font['GSUB']
            # Check if FeatureList exists and is not empty
            if hasattr(gsub_table.table, 'FeatureList') and gsub_table.table.FeatureList:
                for feature_record in gsub_table.table.FeatureList.FeatureRecord:
                    feature_tag = feature_record.FeatureTag
                    print(f"  - {feature_tag}")
            else:
                print("  No GSUB features found or FeatureList is empty.")
        else:
            print("\nGSUB table not found.")

        # Check for and list GPOS (Glyph Positioning) features
        if 'GPOS' in font:
            print("\nGPOS (Glyph Positioning) Features:")
            gpos_table = font['GPOS']
            # Check if FeatureList exists and is not empty
            if hasattr(gpos_table.table, 'FeatureList') and gpos_table.table.FeatureList:
                for feature_record in gpos_table.table.FeatureList.FeatureRecord:
                    feature_tag = feature_record.FeatureTag
                    print(f"  - {feature_tag}")
            else:
                print("  No GPOS features found or FeatureList is empty.")
        else:
            print("\nGPOS table not found.")

        # Close the font file to release resources
        font.close()

    except FileNotFoundError:
        print(f"Error: Font file not found at '{woff2_path}'. Please check the path.")
    except Exception as e:
        print(f"Error processing font '{woff2_path}': {e}")

if __name__ == "__main__":
    # Set up argument parser
    parser = argparse.ArgumentParser(
        description="List OpenType features (GSUB and GPOS) of a WOFF2 font."
    )
    parser.add_argument(
        "font_path",
        type=str,
        help="The path to the WOFF2 font file."
    )

    # Parse command-line arguments
    args = parser.parse_args()

    # Call the function with the provided font path
    list_opentype_features(args.font_path)
