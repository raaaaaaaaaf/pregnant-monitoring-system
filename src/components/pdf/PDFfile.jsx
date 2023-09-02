import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../../firebase/firebaseConfig'; // Import your Firebase configuration
import { doc, getDoc } from 'firebase/firestore';
import { Page, Text, View, Document, StyleSheet, pdf } from '@react-pdf/renderer';
const styles = StyleSheet.create({
    body: {
        paddingTop: 35,
        paddingBottom: 65,
        paddingHorizontal: 35,

      },
      title: {
        fontSize: 24,
        textAlign: 'center',
        fontFamily: 'Oswald'
      },
      column: {
        width: '50%',
        padding: 10,
      },
      text: {
        fontSize: 12,
        lineHeight: 1.5,
      },

  });

const PDFfile = () => {
    const [pregnancy, setPregnancy] = useState({});
    const { id } = useParams();

    useEffect(() => {
        const pregnancyDocRef = doc(db, 'pregnancy', id);
        const fetchData = async () => {
            try {
                const docSnapshot = await getDoc(pregnancyDocRef);

                if (docSnapshot.exists()) {
                    setPregnancy({ ...docSnapshot.data(), id: docSnapshot.id });
                } else {
                    setPregnancy({});
                }
            } catch (error) {
                console.error('Error fetching pregnancy data:', error);
                setPregnancy({});
            }
        };
        fetchData();
    }, [id]);

    console.log(pregnancy);

  return (
    <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.title}>
          {pregnancy}
      </Text>
      {/* Left Column */}
      <View style={styles.column}>
        <Text style={styles.text}>
          This is the left column. You can add your content here.
        </Text>
      </View>

      {/* Right Column */}
      <View style={styles.column}>
        <Text style={styles.text}>
          This is the right column. You can add your content here.
        </Text>
      </View>
    </Page>
  </Document>
  )
}

export default PDFfile